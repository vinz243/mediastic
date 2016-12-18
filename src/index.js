const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
let fileNameParser = require('./fileNameParser');
let provider = require('./spotify.provider');

module.exports = function (file) {
	let name = file.replace(/^.*[\\\/]/, '');

	let trackTitle = fileNameParser(name);
	let res = {};
	return provider().searchTrack(trackTitle).then(function (r) {
		res = r;
		res.path = file;
		return new Promise(function(fulfill, reject) {
			fs.exists(file, function (exists) {
				fulfill(exists);
			});
		});
	}).then(function (exists) {
		if(exists) {
			return new Promise(function(fulfill, reject) {
				ffmpeg.ffprobe(file, function (err, metadata) {
					if (err) return reject(err);

					res.bitrate = metadata.format.bit_rate;
					return fulfill(res);
				});
			});
			
		} else {
			return Promise.resolve(res);
		}
	});
};

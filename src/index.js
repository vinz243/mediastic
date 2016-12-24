const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const defaults = require('lodash.defaults');

let fileNameParser = require('./fileNameParser');

let defaultOps = {
  provider: 'spotify',
  apiKey: ''
}

module.exports = function (file, opts) {
  const options  = defaults(opts, defaultOps);
  const provider = require(`./${options.provider}.provider`);

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

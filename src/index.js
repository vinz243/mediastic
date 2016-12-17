let fileNameParser = require('./fileNameParser');
let provider = require('./spotify.provider');

module.exports = function (file) {
  let name = file.replace(/^.*[\\\/]/, '');

  // console.log(file, name);

  let trackTitle = fileNameParser(name);
  return new Promise(function(fulfill, reject) {
  	provider().searchTrack(trackTitle).then(function (res) {
  		res.path = file;
  		return fulfill(res);
  	});
  });
};

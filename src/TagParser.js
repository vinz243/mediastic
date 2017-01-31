const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

module.exports = function() {
  return function (metadata, next) {
    fs.exists(metadata.path, function (exists) {

      // No need to call ffprobe if file doesn't exisys
      if (!exists) return next();

      ffmpeg.ffprobe(metadata.path, function(err, data) {
        if (err)  {
          return next();
        }

        if (!data || !data.format || !data.format.tags)
          return next();

        const tags = data.format.tags;


        metadata.artist   = tags.artist || tags.ARTIST;
        metadata.album    = tags.album || tags.ALBUM;
        metadata.title    = tags.title;
        metadata.track    = tags.track;
        metadata.duration = data.format.duration;
        metadata.bitrate  = data.format.bit_rate;
        metadata.probed   = data;
        console.log('Found artist', tags, metadata.path);
        next();
      });
    });
  }
};

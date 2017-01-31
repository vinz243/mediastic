const request   = require('request-promise');
const defaults  = require('lodash.defaults');
const assert    = require('assert');

const defaultOpts = {
  // Duration treshold used to compare tracks
  // When spotify returns several results for a given query,
  // We can't know which track to choose
  // So we filter them based on their duration
  // Any result which exceeds Math.abs(resultDuration - fileDuration)
  // by this value will be removed. Duration in seconds

  durationTreshold: 2,

  // When comparing durations, that comparison may only be relevant for
  // long enough tracks: any result shorter than this value will be accepted

  minimumDuration: 15,

  // Any result which album name matches this
  // will be filtered out if there are too many results
  // WARNING: Do not set GLOBAL flag. This will break everything

  albumKeywordBlacklist: /deluxe|renditions/i
}


module.exports = function (opts) {

  const options = defaults(opts, defaultOpts);

  assert(options.albumKeywordBlacklist.flags !== -1);
  assert(options.albumKeywordBlacklist.test !== undefined);

  return function (metadata, next) {
    if (!metadata.title) return next();
    let query = `track:"${metadata.title}"`;

    if (metadata.artist) query += `+artist:"${metadata.artist}"`;
    if (metadata.album) query += `+album:"${metadata.album}"`;

    request({
      uri: 'https://api.spotify.com/v1/search',
      qs: {
        'q': query,
        'type': 'track',
        'limit': 25
      },
      json: true
    }).then(function (res) {
      if (res.tracks.items.length === 0)
        return next();

      let items = res.tracks.items.filter(function (item) {
        let length = res.tracks.items.length;
        let trackDuration = metadata.duration;
        let resultDuration = item.duration_ms / 1000;
        return (length == 1)
                  || !trackDuration
                  || resultDuration < options.minimumDuration
                  || Math.abs(trackDuration
                      - resultDuration) < options.durationTreshold;
      });

      // We still have more than one item, so potential mismatch
      // So we remove singles and blacklisted keywork

      if (items.length > 1)
        items = items.filter(item => {
          let single = item.album.album_type === 'single';
          let blacklisted = options.albumKeywordBlacklist.test(item.album.name);
          return !single && !blacklisted;
        });


      if (items.length > 1) return next(); // Results are not relevant

      let item = items[0];
      try {
        metadata.artist   = item.artists[0].name;
      } catch (err) {
        console.log(err);
      }
      try {
        metadata.album    = item.album.name;
      } catch (err) {
        console.log(err);
      } 
      metadata.duration = item.duration_ms / 1000;
      metadata.title    = item.name;
      return next();
    });

  }
}

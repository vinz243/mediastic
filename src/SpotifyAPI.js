const request = require('request-promise');

module.exports = function () {
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
        'limit': 5
      },
      json: true
    }).then(function (res) {
      if (res.tracks.length === 0)
        next();

      let item = res.tracks.items[0];

      // If we have more than one item
      // It means or search query was accurate enough
      // So we don't erase automatically found metadata

      // if (res.tracks.length > 1) {
      //   metadata.artist   = metadata.artist   || item.artists[0].name;
      //   metadata.album    = metadata.album    || item.album.name;
      //   metadata.duration = metadata.duration || item.duration_ms / 1000;
      //   metadata.title    = metadata.title    || item.name;
      //   return next();
      // }

      metadata.artist   = item.artists[0].name;
      metadata.album    = item.album.name;
      metadata.duration = item.duration_ms / 1000;
      metadata.title    = item.name;
      return next();
    });

  }
}

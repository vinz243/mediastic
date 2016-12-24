const request = require('request-promise');

module.exports = function () {
  return {
    searchTrack: function (name) {
      return new Promise(function (fulfill, reject) {
        request({
          uri: 'https://api.spotify.com/v1/search',
          qs: {
            'q': name,
            'type': 'track',
            'limit': 1
          },
          json: true
        }).then(function (res) {
          if (res.tracks.length === 0) {
            fulfill({
              artistName: 'Unknown',
              albumName: 'Unknown',
              duration: 0,
              trackTitle: name
            });
          }
          let item = res.tracks.items[0];

          let data = {
            artistName: item.artists[0].name,
            albumName: item.album.name,
            duration: item.duration_ms / 1000,
            trackTitle: item.name
          };
          fulfill(data);
        });
      });
    }
  };
}

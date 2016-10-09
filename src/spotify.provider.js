import request from 'request-promise';

export default () => {
  return {
    searchTrack: async (name) => {
        let res = await request({
          uri: 'https://api.spotify.com/v1/search',
          qs: {
            'q': name,
            'type': 'track',
            'limit': 1
          },
          json: true
        });

        let item = res.tracks.items[0];

        let data = {
          artistName: item.artists[0].name,
          albumName: item.album.name,
          duration: item.duration_ms / 1000,
          trackTitle: item.name
        };
        return data;
    }
  };
}

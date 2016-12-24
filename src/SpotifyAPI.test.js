import test from 'ava';
import SpotifyAPI from './SpotifyAPI';

const middleware = SpotifyAPI();
const spot = function (metadata) {
  return new Promise(function (resolve, reject) {
    middleware(metadata, function () {
      resolve(metadata);
    });
  });
};

test('finds popular music by its name', async t => {
  const res = await spot({
    title: 'Radioactive'
  });
  t.is(res.title, 'Radioactive');
  t.is(res["artist"], 'Imagine Dragons');
  t.is(res.album, 'Night Visions');
});

test('finds good music with similar titles', async t => {
  const res = await spot({
    title: 'Radio',
    artist: 'Casseurs Flowters'
  });

  t.is(res.title, 'Freestyle Radio Phoenix');
  t.is(res.artist, 'Casseurs Flowters');
  t.is(res.album, 'Comment c\'est loin');
});

// test('doesn\'t change metadata if several results', async t => {
//   const res = await spot({title: 'we'});
//
// });

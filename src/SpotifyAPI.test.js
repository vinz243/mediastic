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
    title: 'Radioactive',
    album: 'Night Visions'
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

test('skip not relevant results', async t => {
  const res = await spot({
    title: 'We'
  });
  t.is(res.title, 'We');
  t.is(res.album, undefined);
})

test('does not accept global flag', async t => {
  t.throws(SpotifyAPI({albumKeywordBlacklist: /test/gi}));
});

test('finds track by it\'s duration', async t => {
  const res = await spot({
    title: 'Weed',
    duration: 225
  });
  t.is(res.title, 'Smoke Some Weed');
});

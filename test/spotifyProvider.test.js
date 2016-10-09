import provider from '../src/spotify.provider';
import test from 'ava';

test('finds commercialized music', async t => {
  let crap = await provider().searchTrack('Radioactive');
  t.is(crap.artistName, 'Imagine Dragons');
  t.is(crap.trackTitle, 'Radioactive');
  t.is(crap.albumName, 'Night Visions');
});

import test from 'ava';
import mediastic from '../src';
import path from 'path';
test('works for radioactive track', async t => {
  let crap = await mediastic('01.Radioactive.flac');
  t.is(crap.artistName, 'Imagine Dragons');
  t.is(crap.albumName, 'Night Visions');
  t.is(crap.trackTitle, 'Radioactive');
});

test('works for good ol\' AC/DC', async t => {
  let back = await mediastic('C:/Users/test/music/06-ACDC-album-back_in_black.flac');
  t.is(back.artistName, 'AC/DC');
  t.is(back.albumName, 'Back In Black');
  t.is(back.trackTitle, 'Back In Black');
});
test('bitrate detection works', async t => {
  let track = await mediastic(path.resolve('./test/files/04 - Cleanin Out My Closet.mp3'));
  t.is(track.artistName, 'Eminem');
  t.is(track.trackTitle, 'Cleanin\' Out My Closet');
  t.is(track.bitrate, 158110);
});

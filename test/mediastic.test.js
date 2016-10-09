import test from 'ava';
import mediastic from '../src';

test('works for radioactive track', async t => {
  let crap = await mediastic('/home/test/Music/09. Radioactive.mp3');
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

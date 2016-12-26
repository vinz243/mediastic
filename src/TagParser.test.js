import path from 'path';
import test from 'ava';
import sinon from 'sinon';
import TagParser from './TagParser';

const middleware = TagParser();

const parse = function (path) {
  return new Promise(function (resolve, reject) {
    let metadata = {path};

    middleware(metadata, function () {
      resolve(metadata);
    });
  });
};

test('parses correctly mp3 file', async t => {
  const filePath = path.resolve('./test/files/04 - Cleanin Out My Closet.mp3');
  const metadata = await parse(filePath);

  t.is(metadata.album, 'The Eminem Show');
  t.is(metadata.title, 'Cleanin Out My Closet');
  t.is(metadata.artist, 'Eminem');
  t.is(metadata.track, '04');
  t.is(metadata.bitrate, 158110);
});

test('continue if file doesn\'t exist', async t => {
  const metadata = await parse('some where');

  t.pass();
});

test('continue if file is invalid', async t => {
  const filePath = path.resolve('./test/files/Alborosie - Rich.mp3');
  const metadata = await parse(filePath);

  t.is(metadata.album,  undefined);
  t.is(metadata.title,  undefined);
  t.is(metadata.artist, undefined);
  t.is(metadata.track,  undefined);
});

import test from 'ava';
import Mediastic from './Mediastic';
import path from 'path';

test('should be a constructor or a function', t => {
  let instance = new Mediastic();
  t.is(instance.constructor, Mediastic);
  t.is(Mediastic().constructor, Mediastic);
});

const createMiddleware = (str) => (metadata, next) => {
  metadata.path += str;
  next();
};

test('should chain correctly middlewares', async t => {
  let med = Mediastic();
  med.use(createMiddleware('H'));
  med.use(createMiddleware('e'));
  med.use(createMiddleware('l'));
  med.use(createMiddleware('l'));
  med.use(createMiddleware('o'));
  med.use(createMiddleware(','));
  med.use(createMiddleware(' '));
  med.use(createMiddleware('W'));
  med.use(createMiddleware('o'));
  med.use(createMiddleware('r'));
  med.use(createMiddleware('l'));
  med.use(createMiddleware('d'));
  med.use(createMiddleware('!'));

  let res = await med.call('');

  t.is(res.path, 'Hello, World!');
});

test('should throw errors correctly', async t => {
  let med = Mediastic();
  med.use(createMiddleware('test'));
  med.use(function () {
    throw new Error('42')
  });
  med.use(createMiddleware('test'));

  t.throws(med.call(''), '42');
});

test('should find correctly provided tracks', async t => {
  let mediastic = Mediastic();
  mediastic.loadDefaults();

  let cleanin = await mediastic.call(path.resolve('./test/files/04 - Cleanin Out My Closet.mp3'));
  t.is(cleanin.title, 'Cleanin Out My Closet');
  t.is(cleanin.album, 'The Eminem Show');
  t.is(cleanin.artist, 'Eminem');

  let rich = await mediastic.call(path.resolve('./test/files/Alborosie - Rich.mp3'));
  t.is(rich.title, 'Rich');
  t.is(rich.album, undefined);
  t.is(rich.artist, undefined);

  let fly420 = await mediastic.call(path.resolve('./test/files/unknow.file.mp3'));
  t.is(fly420.title, 'unknow.file');
  t.is(fly420.album, undefined);
  t.is(fly420.artist, undefined);

});

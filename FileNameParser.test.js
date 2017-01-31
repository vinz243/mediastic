import FileNameParser from './FileNameParser';
import test from 'ava';
import sinon from 'sinon';

let middleware = FileNameParser();

let parser = function (path) {
  let metadata = {path};
  middleware(metadata, function(){});
  return metadata.title;
}

test('works for `<##>[.]<Track Name>.mp3`', t => {
  t.is(parser('05. Strolling.mp3'), 'Strolling');
  t.is(parser('06 Fly 420.flac'), 'Fly 420');
});

test('works for `18-davodka_(mentalites_sons_dangereux)-jadhere_plus.mp3`', t => {
  t.is(parser('18-davodka_(mentalites_sons_dangereux)-jadhere_plus.mp3'),
    'jadhere plus');
});

test('works for `Hugo Tsr - Jungle Urbaine.mp3`', t => {
  t.is(parser('Hugo Tsr - Jungle Urbaine.mp3'), 'Jungle Urbaine');
});

test('works for `06-ACDC-album-back_in_black.flac`', t => {
  t.is(parser('06-ACDC-album-back_in_black.flac'), 'back in black');
})

test('ignores feat', t => {
  t.is(parser('02 I need a Doctor feat. Dr Dre & Skylar Grey.flac'),
    'I need a Doctor');
})

test('calls next()', t => {
  let callback = sinon.spy();

  middleware({path: 'Test.mp3'}, callback);

  t.truthy(callback.called);
});

test('calls next() even though file name doesn\'t match', t => {

  let callback = sinon.spy();

  middleware({path: 'Test.txt'}, callback);

  t.truthy(callback.called);
});

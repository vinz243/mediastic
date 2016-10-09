import parser from '../src/fileNameParser';
import test from 'ava';

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

import test from 'tape';
import 'test/helpers/setup';
import tokenList from 'src/utils/token-list';

test('utils/token-list', t => {
  t.test('prevents duplicate tokens', t => {
    t.is(tokenList('foo', 'foo bar baz'), 'foo bar baz');
    t.end();
  });

  t.test('adds the id to the end of the current value', t => {
    t.is(tokenList('baz', 'foo bar'), 'foo bar baz');
    t.end();
  });
});

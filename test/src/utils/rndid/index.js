import test from 'tape';
import 'test/helpers/setup';
import rndid from 'src/utils/rndid';

test('utils/rndid', t => {
  t.test('returns a unique string', t => {
    let hasDuplicates = false;
    const ids = new Set();

    for (var i = 0; i < 10000; i++) {
      const id = rndid();

      if (ids.has(id)) {
        hasDuplicates = true;
        break;
      }

      ids.add(id);
    }

    t.false(hasDuplicates);
    t.end();
  });
});

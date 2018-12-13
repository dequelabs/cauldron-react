import 'test/helpers/setup';
import test from 'tape';
import clickLink from 'src/lib/commons/MenuItem/click-link';

const fixture = document.createElement('div');
fixture.innerHTML = `
  <a id="link-one"></a>
  <a id="link-two"></a>
`;

document.body.appendChild(fixture);
const one = document.getElementById('link-one');
const two = document.getElementById('link-two');

test('__commons/MenuItem/click-link__', t => {
  t.test('clicks the first link within the target', t => {
    let firstCalled = false,
      secondCalled = false;
    const onFirstClick = () => (firstCalled = true);
    const onSecondClick = () => (secondCalled = true);

    one.addEventListener('click', onFirstClick);
    two.addEventListener('click', onSecondClick);

    clickLink(fixture, fixture);

    t.true(firstCalled);
    t.false(secondCalled);

    one.removeEventListener('click', onFirstClick);
    two.removeEventListener('click', onSecondClick);
    t.end();
  });

  t.test('does nothing if the target is an anchor', t => {
    let firstCalled = false,
      secondCalled = false;
    const onFirstClick = () => (firstCalled = true);
    const onSecondClick = () => (secondCalled = true);

    one.addEventListener('click', onFirstClick);
    two.addEventListener('click', onSecondClick);

    clickLink(one, one);

    t.false(firstCalled);
    t.false(secondCalled);

    one.removeEventListener('click', onFirstClick);
    two.removeEventListener('click', onSecondClick);
    t.end();
  });

  t.test('teardown', t => {
    document.body.innerHTML = '';
    t.pass();
    t.end();
  });
});

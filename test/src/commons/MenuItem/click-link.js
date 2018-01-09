import test from 'tape';
import proxyquire from 'proxyquire';
import clickLink from '../../../../src/lib/commons/MenuItem/click-link';
import '../../../helpers/setup';

proxyquire.noCallThru();

const item = window.document.createElement('div');
const main = window.document.createElement('div');
main.className = 'dqpl-main-content';
const anchor = window.document.createElement('a');

window.document.body.appendChild(main);
item.appendChild(anchor);
window.document.body.appendChild(item);

test('__MenuItem/clickLink__', t => {
  t.test('clicks the child link', t => {
    t.plan(1);

    const onClick = () => {
      t.pass();
      anchor.removeEventListener('click', onClick);
    };

    anchor.addEventListener('click', onClick);
    clickLink(item, false);
  });

  t.test('given truthy `isSideBar` param, focuses the main', t => {
    t.plan(1);

    clickLink(item, true);
    t.equal(document.activeElement, main);
  });

  t.test('given a non-wide viewport calls `triggerToggle` action', t => {
    t.plan(1);

    const cl = proxyquire('../../../../src/lib/commons/MenuItem/click-link', {
      '../../../store': {
        getState: () => ({ viewport: { isWide: false } })
      },
      '../../../actions/menu': {
        // this may look wierd but when triggerToggle gets called, t.pass will too
        triggerToggle: t.pass
      }
    }).default;

    cl(item, true);
  });
});

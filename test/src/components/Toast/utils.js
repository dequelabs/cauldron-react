import test from 'tape';
import { tabIndexHandler } from 'src/lib/components/Toast/utils';
import 'test/helpers/setup';

let div, toast, targets;
const { document } = window;
const teardown = () => {
  if (!div) { return; }
  document.body.removeChild(div);
};
const setup = () => {
  teardown();
  div = document.createElement('div');
  div.innerHTML = `
    <div class="toaster"></div>
    <div class="zero" tabindex="0"></div>
    <div class="minus-one" tabindex="-1"></div>
  `;

  document.body.appendChild(div);
  toast = div.querySelector('.toaster');
  targets = Array.from(div.querySelectorAll('.zero, .minus-one'));
};

test('__Toast/utils__', t => {
  t.test('reset', t => {
    t.test('properly reverts tabIndex', t => {
      t.plan(2);
      setup();
      // set cached tabindex values
      targets.forEach(target => {
        target.setAttribute('data-cached-tabindex', target.tabIndex);
        target.tabIndex = -1;
      });

      tabIndexHandler(true, toast);

      t.equal(targets[0].tabIndex, 0);
      t.equal(targets[1].tabIndex, -1);
    });
  });

  t.test('set', t => {
    t.test('properly sets data-cached-tabindex/tabIndex', t => {
      t.plan(2);
      setup();

      tabIndexHandler(false, toast);
      t.equal(targets[0].tabIndex, -1);
      t.equal(targets[0].getAttribute('data-cached-tabindex'), '0');
    });
  });
});

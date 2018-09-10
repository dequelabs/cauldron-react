import test from 'tape';
import '../../../helpers/setup';
import AriaIsolate from '../../../../src/lib/utils/aria-isolate/';

const { document } = window;
const div = document.createElement('div');
div.innerHTML = `
  <div id="one">hello worlds</div>
  <div id="parent"><div id="isolate-me"></div></div>
  <div id="already-hidden" aria-hidden="true"></div>
  <span id="two">Fred</span>
`;
document.body.innerHTML = '';
document.body.appendChild(div);
const target = document.getElementById('isolate-me');
const isolator = new AriaIsolate(target);

test('__utils/AriaIsolate__', t => {
  t.test('AriaIsolate#activate', t => {
    t.test('properly isolates the target by applying aria-hidden="true" to expected nodes', t => {
      t.plan(4);
      isolator.activate();
      t.equal(isolator.affectedElements.length, 2);
      t.equal(isolator.affectedElements.indexOf(document.getElementById('parent')), -1);
      t.equal(isolator.affectedElements.indexOf(document.getElementById('isolate-me')), -1);
      t.equal(isolator.affectedElements.indexOf(document.getElementById('already-hidden')), -1);
      // cleanup
      isolator.deactivate();
    });
  });

  t.test('AriaIsolate#deactivate', t => {
    t.test('properly removes aria-hidden from each of the affectedElements', t => {
      t.plan(2);

      isolator.activate();
      t.equal(isolator.affectedElements.length, 2);

      isolator.deactivate();
      t.equal(div.querySelectorAll('[aria-hidden="true"]').length, 1);
    });
  });
});

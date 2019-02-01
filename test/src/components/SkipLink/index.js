import React from 'react';
import test from 'tape';
import { mount } from 'enzyme';
import SkipLink from 'src/components/SkipLink';
import 'test/helpers/setup';

test('__SkipLink__', t => {
  t.test('_onClick_', t => {
    t.test('queries the document for the target and focuses it', t => {
      t.plan(2);

      const target = window.document.createElement('div');
      target.id = 'skip-target';
      window.document.body.appendChild(target);
      const wrapper = mount(<SkipLink target={'#skip-target'} />);

      wrapper.find('.dqpl-skip-link').simulate('click');

      t.equal(document.activeElement, target);
      t.equal(target.tabIndex, -1);
    });
  });

  t.test('_onFocus_', t => {
    t.test('sets `currentClass` state properly', t => {
      t.plan(2);
      const wrapper = mount(<SkipLink target={'#skip-target'} />);
      wrapper.instance().onFocus();

      // accounts for async setState calls (including the 2nd one with a timeout)
      setTimeout(() => {
        const node = wrapper.getDOMNode(); // enzyme is silly about hasClass on the wrapper itself
        t.ok(node.classList.contains('dqpl-skip-container-active'));
        t.ok(node.classList.contains('dqpl-skip-fade'));
      }, 100);
    });
  });

  t.test('_onBlur_', t => {
    t.test('sets `currentClass` state properly', t => {
      t.plan(2);
      const wrapper = mount(<SkipLink target={'#skip-target'} />);
      wrapper.instance().onFocus(); // trigger the adding of the classes
      wrapper.instance().onBlur();

      // accounts for async setState calls (including the 2nd one with a timeout)
      setTimeout(() => {
        const node = wrapper.getDOMNode(); // enzyme is silly about hasClass on the wrapper itself
        t.notOk(node.classList.contains('dqpl-skip-container-active'));
        t.notOk(node.classList.contains('dqpl-skip-fade'));
      }, 100);
    });
  });
});

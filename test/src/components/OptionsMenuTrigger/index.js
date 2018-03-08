import React from 'react';
import test from 'tape';
import { mount } from 'enzyme';
import Trigger from 'src/lib/components/OptionsMenuTrigger';
import 'test/helpers/setup';

test('__OptionsMenuTrigger Component__', t => {
  t.test('handles clicks', t => {
    t.plan(3);
    let called = false;
    const trigger = mount(<Trigger onClick={() => called = true} />);
    t.equal(trigger.state('expanded'), false);
    trigger.simulate('click');
    t.ok(called);
    t.equal(trigger.state('expanded'), true);
  });

  t.test('handles keydowns', t => {
    t.plan(2);
    let called = false, clicked = false;
    const trigger = mount(<Trigger onKeyDown={() => called = true} />);
    const domElement = trigger.getDOMNode();
    domElement.addEventListener('click', () => clicked = true);
    trigger.simulate('keydown', { which: 40 });

    t.ok(called);
    t.ok(clicked);
  });
});

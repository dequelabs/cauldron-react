import 'test/helpers/setup';
import React from 'react';
import test from 'tape';
import { mount } from 'enzyme';
import { TopBarTrigger } from 'src/components/TopBar/';

test('__TopBar/TopBarTrigger__', t => {
  t.test('handles enter/space keydowns', t => {
    let clicked = false;
    let keyed = false;
    const e = { which: 13, preventDefault: () => {} };
    const wrapper = mount(
      <TopBarTrigger
        onClick={() => (clicked = true)}
        onKeyDown={() => (keyed = true)}
      />
    );
    // ENTER
    wrapper.instance().onKeyDown(e);
    t.true(clicked);
    t.true(keyed);
    // reset
    clicked = false;
    keyed = false;
    // SPACE
    wrapper.instance().onKeyDown({ ...e, which: 32 });
    t.true(clicked);
    t.true(keyed);
    t.end();
  });
});

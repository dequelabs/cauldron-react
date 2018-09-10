import 'test/helpers/setup';
import React from 'react';
import test from 'tape';
import { mount } from 'enzyme';
import MenuItem from 'src/lib/commons/MenuItem';

test('__commons/MenuItem__', t => {
  t.test('clicks first direct child link given a click', t => {
    t.plan(1);
    let clicked = false;
    const wrapper = mount(
      <MenuItem>
        <a />
      </MenuItem>
    );
    wrapper
      .find('a')
      .getDOMNode()
      // enzyme's simulate won't trigger an onClick on the above <a />
      .addEventListener('click', () => clicked = true);

    wrapper.simulate('click');
    t.true(clicked);
  });

  t.test('calls onClick prop', t => {
    t.plan(1);
    let clicked = false;
    const click = () => clicked = true;
    mount(<MenuItem onClick={click}>BOOGNISH</MenuItem>)
      .simulate('click');

    t.true(clicked);
  });

  t.test('clicks the menuitem given enter/space keydowns', t => {
    t.plan(1);
    let clickCount = 0;
    const wrapper = mount(<MenuItem>BOOGNISH</MenuItem>);

    wrapper.instance().item = {
      click: () => clickCount++
    };

    wrapper.simulate('keydown', { which: 13 }); // ENTER
    wrapper.simulate('keydown', { which: 9999 }); // (nothing)
    wrapper.simulate('keydown', { which: 32 }); // SPACE
    t.equal(clickCount, 2);
  });

  t.test('supports menuItemRef props', t => {
    t.plan(1);
    let called = false;
    const ref = () => called = true;
    mount(<MenuItem menuItemRef={ref}>BOOGNISH</MenuItem>);
    t.true(called);
  });
});

import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

const MenuItem = ({ menuItemRef }) => <div ref={menuItemRef} />;
MenuItem.propTypes = { menuItemRef: PropTypes.func };

jest.mock('../../utils/viewport', () => ({
  isWide: () => false
}));

const SideBar = require('../../../../src/components/SideBar').default;
const mountWrapper = (onDismiss = () => {}) =>
  mount(
    <SideBar onDismiss={onDismiss}>
      <MenuItem />
      <MenuItem />
      <MenuItem />
    </SideBar>
  );
const noop = () => {};

test('properly handles viewport resize', () => {
  expect.assertions(1);
  const wrapper = mountWrapper();
  wrapper.setState({ wide: true });
  wrapper.instance().onResize();
  expect(wrapper.state('wide')).toBe(false);
});

test('handles UP arrow', () => {
  expect.assertions(2);
  const wrapper = mountWrapper();
  const e = { which: 38, preventDefault: noop };

  // from 2nd to 1st
  wrapper.setState({ focusIndex: 1 });
  wrapper.instance().onKeyDown(e);
  expect(wrapper.state('focusIndex')).toBe(0);
  // from 1st to 3rd
  wrapper.setState({ focusIndex: 0 });
  wrapper.instance().onKeyDown(e);
  expect(wrapper.state('focusIndex')).toBe(2);
});

test('handles DOWN arrow', () => {
  expect.assertions(2);
  const wrapper = mountWrapper();
  const e = { which: 40, preventDefault: noop };

  // from 1st to 2nd
  wrapper.setState({ focusIndex: 0 });
  wrapper.instance().onKeyDown(e);
  expect(wrapper.state('focusIndex')).toBe(1);
  // from 3rd to 1st
  wrapper.setState({ focusIndex: 2 });
  wrapper.instance().onKeyDown(e);
  expect(wrapper.state('focusIndex')).toBe(0);
});

test('handles escape (calls onDismiss)', () => {
  expect.assertions(1);
  let called = false;
  const wrapper = mountWrapper(() => (called = true));

  const e = { which: 27 };
  wrapper.instance().onKeyDown(e);
  expect(called).toBeTruthy();
});

test('animates / toggles display given a show prop change', () => {
  expect.assertions(2);
  const wrapper = mountWrapper();
  wrapper.setProps({ show: true });

  setTimeout(() => {
    expect(wrapper.state('animateClass')).toBe('dqpl-show dqpl-active');
    wrapper.setProps({ show: false });

    setTimeout(() => {
      expect(wrapper.state('animateClass')).toBe('');
    }, 101);
  }, 101); // wait for animation classes to get added
});

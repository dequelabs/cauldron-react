import React from 'react';
import PropTypes from 'prop-types';
import { mount, shallow } from 'enzyme';
import TopBar from '../../../../src/components/TopBar';

const MenuItem = ({ menuItemRef }) => <div ref={menuItemRef} />;
MenuItem.propTypes = { menuItemRef: PropTypes.func };

test('renders', () => {
  expect.assertions(1);
  expect(
    shallow(
      <TopBar>
        <div />
      </TopBar>
    )
  ).toBeTruthy();
});

test('focusIndex is set to 1 given focusIndex 0 + trigger + newly wide viewport', () => {
  expect.assertions(1);
  const wrapper = mount(
    <TopBar hasTrigger={true}>
      <MenuItem />
    </TopBar>
  );
  wrapper.setState({ wide: false, focusIndex: 0 });
  wrapper.instance().onResize();
  expect(wrapper.state('focusIndex')).toBe(1);
});

test('given a left arrow keydown, properly sets focusIndex', () => {
  expect.assertions(2);
  const e = {
    which: 37,
    preventDefault: () => {}
  };
  const wrapper = mount(
    <TopBar>
      <MenuItem />
      <MenuItem />
      <MenuItem />
    </TopBar>
  );

  // from 2nd to 1st
  wrapper.setState({ focusIndex: 1 });
  wrapper.instance().onKeyDown(e);
  expect(wrapper.state('focusIndex')).toBe(0);
  // from 1st to 3rd (circularity)
  wrapper.setState({ focusIndex: 0 });
  wrapper.instance().onKeyDown(e);
  expect(wrapper.state('focusIndex')).toBe(2);
});

test('given a right arrow keydown properly sets focusIndex', () => {
  expect.assertions(2);
  const e = {
    which: 39,
    preventDefault: () => {}
  };
  const wrapper = mount(
    <TopBar>
      <MenuItem />
      <MenuItem />
      <MenuItem />
    </TopBar>
  );

  // from 1st to 2nd
  wrapper.setState({ focusIndex: 0 });
  wrapper.instance().onKeyDown(e);
  expect(wrapper.state('focusIndex')).toBe(1);
  // from 3rd to 1st (circularity)
  wrapper.setState({ focusIndex: 2 });
  wrapper.instance().onKeyDown(e);
  expect(wrapper.state('focusIndex')).toBe(0);
});

test('supports falsy children', () => {
  expect.assertions(1);
  expect(
    shallow(
      <TopBar>
        <div />
        {false && <div />}
      </TopBar>
    )
  ).toBeTruthy();
});

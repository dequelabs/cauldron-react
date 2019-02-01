import React from 'react';
import PropTypes from 'prop-types';
import test from 'tape';
import proxyquire from 'proxyquire';
import { mount, shallow } from 'enzyme';
import 'test/helpers/setup';

proxyquire.noCallThru();

const MenuItem = ({ menuItemRef }) => <div ref={menuItemRef} />;
MenuItem.propTypes = { menuItemRef: PropTypes.func };
const TopBar = proxyquire('../../../../src/components/TopBar', {
  '../../utils/viewport': {
    isWide: () => true
  }
}).default;

test('__TopBar__', t => {
  t.test('renders', t => {
    t.plan(1);
    t.ok(
      shallow(
        <TopBar>
          <div />
        </TopBar>
      )
    );
  });

  t.test('given a focusIndex of 0, a trigger, and a newly wide viewport', t => {
    t.test('focusIndex is set to 1', t => {
      t.plan(1);
      const wrapper = mount(
        <TopBar hasTrigger={true}>
          <MenuItem />
        </TopBar>
      );
      wrapper.setState({ wide: false, focusIndex: 0 });
      wrapper.instance().onResize();
      t.is(wrapper.state('focusIndex'), 1);
    });
  });

  t.test('given a left arrow keydown', t => {
    t.test('properly sets focusIndex', t => {
      t.plan(2);
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
      t.equal(wrapper.state('focusIndex'), 0);
      // from 1st to 3rd (circularity)
      wrapper.setState({ focusIndex: 0 });
      wrapper.instance().onKeyDown(e);
      t.equal(wrapper.state('focusIndex'), 2);
    });
  });

  t.test('given a right arrow keydown', t => {
    t.test('properly sets focusIndex', t => {
      t.plan(2);
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
      t.equal(wrapper.state('focusIndex'), 1);
      // from 3rd to 1st (circularity)
      wrapper.setState({ focusIndex: 2 });
      wrapper.instance().onKeyDown(e);
      t.equal(wrapper.state('focusIndex'), 0);
    });
  });
});

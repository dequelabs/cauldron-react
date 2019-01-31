import React from 'react';
import PropTypes from 'prop-types';
import test from 'tape';
import proxyquire from 'proxyquire';
import { mount } from 'enzyme';
import 'test/helpers/setup';

proxyquire.noCallThru();

const MenuItem = ({ menuItemRef }) => <div ref={menuItemRef} />;
MenuItem.propTypes = { menuItemRef: PropTypes.func };

const SideBar = proxyquire('../../../../src/components/SideBar', {
  '../../utils/viewport': {
    isWide: () => false
  }
}).default;
const mountWrapper = (onDismiss = () => {}) =>
  mount(
    <SideBar onDismiss={onDismiss}>
      <MenuItem />
      <MenuItem />
      <MenuItem />
    </SideBar>
  );
const noop = () => {};

test('__SideBar__', t => {
  t.test('properly handles viewport resize', t => {
    t.plan(1);
    const wrapper = mountWrapper();
    wrapper.setState({ wide: true });
    wrapper.instance().onResize();
    t.equal(wrapper.state('wide'), false);
  });

  t.test('keydowns', t => {
    t.test('handles UP arrow', t => {
      t.plan(2);
      const wrapper = mountWrapper();
      const e = { which: 38, preventDefault: noop };

      // from 2nd to 1st
      wrapper.setState({ focusIndex: 1 });
      wrapper.instance().onKeyDown(e);
      t.equal(wrapper.state('focusIndex'), 0);
      // from 1st to 3rd
      wrapper.setState({ focusIndex: 0 });
      wrapper.instance().onKeyDown(e);
      t.equal(wrapper.state('focusIndex'), 2);
    });
  });

  t.test('handles DOWN arrow', t => {
    t.plan(2);
    const wrapper = mountWrapper();
    const e = { which: 40, preventDefault: noop };

    // from 1st to 2nd
    wrapper.setState({ focusIndex: 0 });
    wrapper.instance().onKeyDown(e);
    t.equal(wrapper.state('focusIndex'), 1);
    // from 3rd to 1st
    wrapper.setState({ focusIndex: 2 });
    wrapper.instance().onKeyDown(e);
    t.equal(wrapper.state('focusIndex'), 0);
  });

  t.test('handles escape (calls onDismiss)', t => {
    t.plan(1);
    let called = false;
    const wrapper = mountWrapper(() => (called = true));

    const e = { which: 27 };
    wrapper.instance().onKeyDown(e);
    t.true(called);
  });

  t.test('given a show prop change', t => {
    t.test('animates / toggles display', t => {
      t.plan(2);
      const wrapper = mountWrapper();
      wrapper.setProps({ show: true });

      setTimeout(() => {
        t.equal(wrapper.state('animateClass'), 'dqpl-show dqpl-active');
        wrapper.setProps({ show: false });

        setTimeout(() => {
          t.equal(wrapper.state('animateClass'), '');
        }, 101);
      }, 101); // wait for animation classes to get added
    });
  });
});

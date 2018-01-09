import React from 'react';
import test from 'tape';
import proxyquire from 'proxyquire';
import { mount } from 'enzyme';
import * as viewportActions from 'src/actions/viewport';
import 'test/helpers/setup';

proxyquire.noCallThru();

const defaultState = {
  menu: { isOpen: false },
  viewport: { isWide: true }
};

const SideBar = proxyquire('../../../../src/lib/composites/SideBar', {
  '../../../store': {
    subscribe: () => {},
    getState: () => defaultState
  }
}).default;

test('__composites/SideBar__', t => {
  t.test('_onResize_', t => {
    t.test('calls on `onResize` upon mounting', t => {
      t.plan(1);

      let called = false;
      const SideBar = proxyquire('../../../../src/lib/composites/SideBar', {
        '../../../actions/viewport': {
          ...viewportActions,
          onResize: () => called = true
        }
      }).default;

      mount(<SideBar><div /></SideBar>);
      t.ok(called);
    });

    t.test('calls `onResize` upon window resize', t => {
      t.plan(1);

      let called = false;
      const SideBar = proxyquire('../../../../src/lib/composites/SideBar', {
        '../../../actions/viewport': {
          ...viewportActions,
          onResize: () => called = true
        }
      }).default;

      mount(<SideBar><div /></SideBar>);
      called = false; // reset it after mounting
      // simulate a window resize event
      const e = new Event('resize');
      window.dispatchEvent(e);

      t.ok(called);
    });
  });

  t.test('_handleChange_', t => {
    t.test('handles viewport `isWide` changes', t => {
      t.plan(1);
      const wrapper = mount(<SideBar><div /></SideBar>);

      wrapper.setState({ wide: false }, () => {
        wrapper.instance().handleChange();
        setTimeout(() => { // let setState inside of component finish
          t.ok(wrapper.state('wide'));
        });
      });
    });

    t.test('handles expanded `isOpen` changes', t => {
      t.plan(1);
      const wrapper = mount(<SideBar><div /></SideBar>);

      wrapper.setState({ expanded: true }, () => {
        wrapper.instance().handleChange();

        setTimeout(() => { // let setState inside of component finish
          t.notOk(wrapper.state('expanded'));
        });
      });
    });
  });

  t.test('_render_', t => {
    t.test('given a narrow viewport sets aria-expanded properly', t => {
      t.plan(1);
      const wrapper = mount(<SideBar><div /></SideBar>);

      wrapper.setState({ wide: false, expanded: true }, () => {
        t.equal(wrapper.find('ul').getDOMNode().getAttribute('aria-expanded'), 'true');
      });
    });

    t.test('given a wide viewport, does not set aria-expanded', t => {
      t.plan(1);
      const wrapper = mount(<SideBar><div /></SideBar>);

      wrapper.setState({ wide: true }, () => {
        t.notOk(wrapper.find('ul').getDOMNode().hasAttribute('aria-expanded'));
      });
    });
  });
});

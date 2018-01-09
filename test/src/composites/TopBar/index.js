import React from 'react';
import test from 'tape';
import proxyquire from 'proxyquire';
import { mount, shallow } from 'enzyme';
import * as menuActions from 'src/actions/menu';
import TopBar from 'src/lib/composites/TopBar';
import 'test/helpers/setup';

proxyquire.noCallThru();

const defaultState = {
  menu: { isOpen: false },
  viewport: { isWide: false }
};

test('__composites/TopBar__', t => {
  t.test('renders', t => {
    t.plan(1);
    t.ok(shallow(<TopBar><div /></TopBar>));
  });

  test('__TopBar Trigger__', t => {
    t.test('calls `sideBarTriggerIdentify` upon mounting', t => {
      t.plan(1);

      let called = false;
      const Trigger = proxyquire('../../../../src/lib/composites/TopBar', {
        '../../../actions/menu': {
          ...menuActions,
          sideBarTriggerIdentify: () => called = true
        }
      }).Trigger;

      mount(<Trigger index={0} />);
      t.ok(called);
    });

    t.test('calls triggerToggle if down/enter/space is pressed', t => {
      t.plan(1);
      let called = false;
      const Trigger = proxyquire('../../../../src/lib/composites/TopBar', {
        '../../../actions/menu': {
          ...menuActions,
          triggerToggle: () => called = true
        }
      }).Trigger;

      const wrapper = mount(<Trigger index={0} />);
      wrapper.simulate('keyUp', { which: 32 });

      t.ok(called);
    });

    t.test('handles the narrow menu open change', t => {
      t.plan(2);
      const Trigger = proxyquire('../../../../src/lib/composites/TopBar', {
        '../../../store': {
          subscribe: () => {},
          getState: () => defaultState
        }
      }).Trigger;

      const wrapper = mount(<Trigger index={0} />);

      wrapper.setState({ menuOpen: true }, () => {
        wrapper.instance().handleChange();
        setTimeout(() => { // wait for internal component setState to complete
          t.notOk(wrapper.state('menuOpen'));
          t.equal(document.activeElement, wrapper.instance().element);
        });
      });
    });
  });
});

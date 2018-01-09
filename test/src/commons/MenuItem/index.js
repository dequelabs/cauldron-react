import React from 'react';
import test from 'tape';
import proxyquire from 'proxyquire';
import { shallow, mount } from 'enzyme';
import * as menuActions from '../../../../src/actions/menu';
import '../../../helpers/setup';

proxyquire.noCallThru();
const defaults = {
  index: 0,
  stateKey: 'sideBar'
};
const proxyInitialState = {
  viewport: {
    isWide: true
  },
  menu: {
    sideBar: { focusIndex: 0 },
    topBar: {},
    hasHamburger: true,
    isOpen: true
  }
};
const proxyStore = {
  subscribe: () => {},
  getState: () => proxyInitialState,
  dispatch: () => {}
};
const MenuItem = proxyquire('../../../../src/lib/commons/MenuItem', {
  '../../../store': proxyStore
}).default;

const reset = () => {
  window.document.body.innerHTML = '';
};

test('__commons/MenuItem__', t => {
  t.test('sets initial "focusIndex" / "isWide" state', t => {
    reset();
    t.plan(2);
    const wrapper = shallow(<MenuItem {...defaults} />);

    t.equal(wrapper.state('focusIndex'), 0);
    t.true(wrapper.state('isWide'));
  });

  t.test('calls menuItemIdentify', t => {
    reset();
    t.plan(2);
    const ProxyMenuItem = proxyquire('../../../../src/lib/commons/MenuItem', {
      '../../../actions/menu': {
        ...menuActions,
        menuItemIdentify: (type, idx) => {
          t.equal(type, 'SIDE_BAR_ITEM_IDENTIFY');
          t.equal(idx, defaults.index);
        }
      }
    }).default;

    shallow(<ProxyMenuItem {...defaults} />);
  });

  t.test('_handleChange_', t => {
    t.test('handles a focusIndex change given a falsey suppress state', t => {
      reset();
      t.plan(2);
      const wrapper = mount(<MenuItem {...defaults} />);

      wrapper.setState({
        focusIndex: 1
      }, () => {
        wrapper.instance().handleChange();
        setTimeout(() => { // timeout to wait for MenuItem setState to finish
          t.equal(wrapper.state('focusIndex'), 0);
          t.equal(wrapper.getDOMNode(), document.activeElement);
        });
      });
    });

    t.test('given a truthy suppress, calls unsuppressTopBarFocus', t => {
      t.plan(1);
      let called = false;
      const ProxyMenuItem = proxyquire('../../../../src/lib/commons/MenuItem', {
        '../../../store': {
          ...proxyStore,
          getState: () => ({
            ...proxyInitialState,
            menu: {
              ...proxyInitialState.menu,
              topBar: { suppressFocus: true }
            }
          }),
        },
        '../../../actions/menu': {
          ...menuActions,
          unsuppressTopBarFocus: () => called = true
        }
      }).default;

      const wrapper = mount(<ProxyMenuItem {...defaults} />);

      wrapper.setState({
        focusIndex: 1
      }, () => {
        wrapper.instance().handleChange();
        setTimeout(() => {
          t.true(called);
        });
      });
    });

    t.test('handles open state change', t => {
      reset();
      t.plan(2);
      const wrapper = mount(<MenuItem {...defaults} />);

      wrapper.setState({
        open: false
      }, () => {
        wrapper.instance().handleChange();
        setTimeout(() => {
          t.ok(wrapper.state('menuOpen'));
          t.equal(wrapper.getDOMNode(), document.activeElement);
        });
      });
    });
  });

  t.test('_onKeyDown_', t => {
    t.test('handles sideBar narrow escape presses', t => {
      t.plan(1);

      let called = false;
      const ProxyMenuItem = proxyquire('../../../../src/lib/commons/MenuItem', {
        '../../../store': {
          ...proxyStore,
          getState: () => ({
            ...proxyInitialState,
            viewport: { isWide: false }
          }),
        },
        '../../../actions/menu': {
          ...menuActions,
          triggerToggle: () => called = true
        }
      }).default;

      const wrapper = mount(<ProxyMenuItem {...defaults} />);
      wrapper.simulate('keydown', { which: 27 });
      t.ok(called);
    });

    t.test('calls `clickLink()` with ENTER/SPACE keydown on menuitem', t => {
      t.plan(1);

      let called = false;
      const ProxyMenuItem = proxyquire('../../../../src/lib/commons/MenuItem', {
        './click-link': () => called = true
      }).default;

      const wrapper = mount(<ProxyMenuItem {...defaults} />);
      wrapper.simulate('keydown', { which: 13, target: { tagName: 'FRED' } });
      t.ok(called);
    });

    t.test('dispatches onMenuKeydown given arrow key presses', t => {
      t.plan(3);

      const ProxyMenuItem = proxyquire('../../../../src/lib/commons/MenuItem', {
        '../../../store': {
          ...proxyStore,
          getState: () => ({
            ...proxyInitialState,
            viewport: { isWide: false }
          }),
        },
        '../../../actions/menu': {
          ...menuActions,
          onMenuKeydown: (orientation, type, which) => {
            t.equal(orientation, 'vertical');
            t.equal(type, 'SIDE_BAR_FOCUS_INDEX');
            t.equal(which, 37);
          }
        }
      }).default;

      const wrapper = mount(<ProxyMenuItem {...defaults} orientation={'vertical'} />);
      wrapper.simulate('keydown', { which: 37, target: {} });
    });
  });

  t.test('_onClick_', t => {
    t.test('handles non-anchor clicks', t => {
      t.plan(1);

      let called = false;
      const ProxyMenuItem = proxyquire('../../../../src/lib/commons/MenuItem', {
        './click-link': () => called = true
      }).default;

      const wrapper = mount(<ProxyMenuItem {...defaults} />);
      wrapper.simulate('click');
      t.ok(called);
    });
  });

  t.test('calls menuItemRef prop function', t => {
    t.plan(1);

    let called = false;
    mount(<MenuItem {...defaults} menuItemRef={() => called = true} />);
    t.ok(called);
  });
});

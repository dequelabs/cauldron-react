import '../../helpers/setup';
import test from 'tape';
import proxyquire from 'proxyquire';
import * as types from '../../../src/actions/types';
import mockStore from '../../helpers/store';

proxyquire.noCallThru();

test('__Viewport Actions__', t => {
  t.test('__onResize__', t => {
    t.test('dispatches proper data', t => {
      t.plan(2);
      const store = mockStore({
        viewport: 'cats',
        menu: {}
      }, (action) => {
        t.equal(action.type, types.VIEWPORT_SIZE_CHANGE);
        // just checking type here because we don't really care if its true or
        // false (it allows us to not have to mess with jsdom window width hacks)
        t.ok(typeof action.data, 'boolean');
      });

      proxyquire('../../../src/actions/viewport', {
        '../store': store
      }).onResize();
    });

    // NOTE: This test relies on the jsdom window being wide, which apparently it is by default?
    t.test('handles wide/hamburger present/focusIndex=0 state', t => {
      t.plan(1);
      const store = mockStore({
        viewport: 'cats',
        menu: {
          hasHamburger: true,
          topBar: { focusIndex: 0 }
        }
      }, (action) => {
        if (action.type === types.VIEWPORT_SIZE_CHANGE) { return; }
        t.equal(action.type, types.FORCE_TOP_BAR_FOCUS_INDEX);
      });

      proxyquire('../../../src/actions/viewport', {
        '../store': store
      }).onResize();
    });
  });
});

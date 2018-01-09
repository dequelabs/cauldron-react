import '../../helpers/setup';
import test from 'tape';
import * as types from '../../../src/actions/types';
import reducer from '../../../src/reducers/menu';

test('__Menu Reducer__', t => {
  t.test('TOP_BAR_FOCUS_INDEX/SIDE_BAR_FOCUS_INDEX', t => {
    t.test('handles default', t => {
      t.plan(1);
      const newState = reducer({
        sideBar: {},
        topBar: { highestIndex: 5 }
      }, {
        type: types.TOP_BAR_FOCUS_INDEX,
        data: 3
      });

      t.equal(newState.topBar.focusIndex, 3);
    });

    t.test('handles circularity - last to first', t => {
      t.plan(1);
      const newState = reducer({
        sideBar: { highestIndex: 2 },
        topBar: {}
      }, {
        type: types.SIDE_BAR_FOCUS_INDEX,
        data: 555
      });

      t.equal(newState.sideBar.focusIndex, 0);
    });

    t.test('handles circularity - first to last', t => {
      t.plan(1);
      const newState = reducer({
        sideBar: { highestIndex: 2 },
        topBar: {}
      }, {
        type: types.SIDE_BAR_FOCUS_INDEX,
        data: -1
      });

      t.equal(newState.sideBar.focusIndex, 2);
    });
  });

  t.test('SIDE_BAR_ITEM_IDENTIFY/TOP_BAR_ITEM_IDENTIFY', t => {
    t.test('sets highestIndex properly', t => {
      t.plan(1);
      const newState = reducer({
        sideBar: { highestIndex: 2 },
        topBar: {}
      }, {
        type: types.SIDE_BAR_ITEM_IDENTIFY,
        data: 3
      });

      t.equal(newState.sideBar.highestIndex, 3);
    });
  });

  t.test('TRIGGER_TOGGLE', t => {
    t.test('sets isOpen properly', t => {
      t.plan(1);
      const newState = reducer({}, {
        type: types.TRIGGER_TOGGLE,
        data: true
      });

      t.ok(newState.isOpen);
    });
  });

  t.test('SIDE_BAR_TRIGGER_IDENTIFY', t => {
    t.test('sets hasHamburger to true', t => {
      t.plan(1);
      const newState = reducer({}, { type: types.SIDE_BAR_TRIGGER_IDENTIFY });

      t.ok(newState.hasHamburger);
    });
  });

  t.test('FORCE_TOP_BAR_FOCUS_INDEX', t => {
    t.test('sets focusIndex to 1 and suppressFocus to true', t => {
      t.plan(2);
      const newState = reducer({}, { type: types.FORCE_TOP_BAR_FOCUS_INDEX });

      t.equal(newState.topBar.focusIndex, 1);
      t.ok(newState.topBar.suppressFocus);
    });
  });

  t.test('UNSUPPRESS_TOP_BAR_FOCUS', t => {
    t.test('sets suppressFocus to false', t => {
      t.plan(1);
      const newState = reducer({}, { type: types.UNSUPPRESS_TOP_BAR_FOCUS });

      t.notOk(newState.topBar.suppressFocus);
    });
  });
});

import '../../helpers/setup';
import test from 'tape';
import proxyquire from 'proxyquire';
import * as types from '../../../src/actions/types';
import mockStore from '../../helpers/store';

proxyquire.noCallThru();

test('__Menu Actions__', t => {
  t.test('__onMenuKeydown__', t => {
    t.test('dispatches proper data given left arrow with horizontal orientation', t => {
      t.plan(2);
      const dispatch = ({type, data}) => {
        t.equal(type, types.TOP_BAR_FOCUS_INDEX);
        t.equal(data, 1);
      };
      const store = mockStore({
        menu: { topBar: { focusIndex: 2 } }
      }, dispatch);

      proxyquire('../../../src/actions/menu', {
        '../store': store
      }).onMenuKeydown('horizontal', types.TOP_BAR_FOCUS_INDEX, 37);
    });

    t.test('dispatches proper data given right arrow with horizontal orientation', t => {
      t.plan(2);
      const dispatch = ({type, data}) => {
        t.equal(type, types.TOP_BAR_FOCUS_INDEX);
        t.equal(data, 3);
      };
      const store = mockStore({
        menu: { topBar: { focusIndex: 2 } }
      }, dispatch);

      proxyquire('../../../src/actions/menu', {
        '../store': store
      }).onMenuKeydown('horizontal', types.TOP_BAR_FOCUS_INDEX, 39);
    });

    t.test('does not dispatch given key that is not left or right', t => {
      t.plan(1);
      let called = false;
      const dispatch = () => called = true;
      const store = mockStore({
        menu: { topBar: { focusIndex: 2 } }
      }, dispatch);

      proxyquire('../../../src/actions/menu', {
        '../store': store
      }).onMenuKeydown('horizontal', types.TOP_BAR_FOCUS_INDEX, 555);
      t.notOk(called);
    });

    t.test('dispatches proper data given up arrow with vertical orientation', t => {
      t.plan(2);
      const dispatch = ({type, data}) => {
        t.equal(type, types.SIDE_BAR_FOCUS_INDEX);
        t.equal(data, 1);
      };
      const store = mockStore({
        menu: { sideBar: { focusIndex: 2 } }
      }, dispatch);

      proxyquire('../../../src/actions/menu', {
        '../store': store
      }).onMenuKeydown('vertical', types.SIDE_BAR_FOCUS_INDEX, 38);
    });

    t.test('dispatches proper data given down arrow with vertical orientation', t => {
      t.plan(2);
      const dispatch = ({type, data}) => {
        t.equal(type, types.SIDE_BAR_FOCUS_INDEX);
        t.equal(data, 3);
      };
      const store = mockStore({
        menu: { sideBar: { focusIndex: 2 } }
      }, dispatch);

      proxyquire('../../../src/actions/menu', {
        '../store': store
      }).onMenuKeydown('vertical', types.SIDE_BAR_FOCUS_INDEX, 40);
    });

    t.test('does not dispatch given key that is not up or down', t => {
      t.plan(1);
      let called = false;
      const dispatch = () => called = true;
      const store = mockStore({
        menu: { sideBar: { focusIndex: 2 } }
      }, dispatch);

      proxyquire('../../../src/actions/menu', {
        '../store': store
      }).onMenuKeydown('vertical', types.SIDE_BAR_FOCUS_INDEX, 555);
      t.notOk(called);
    });
  });

  t.test('__menuItemIdentify__', t => {
    t.test('dispatches the provided type and action', t => {
      t.plan(2);
      const store = mockStore({}, ({type, data}) => {
        t.equal(type, types.TOP_BAR_ITEM_IDENTIFY);
        t.equal(data, 11);
      });

      proxyquire('../../../src/actions/menu', {
        '../store': store
      }).menuItemIdentify(types.TOP_BAR_ITEM_IDENTIFY, 11);
    });
  });

  t.test('__triggerToggle__', t => {
    t.test('properly toggles open state and dispatches the right data', t => {
      t.plan(2);

      const store = mockStore({
        menu: { isOpen: true }
      }, ({type, data}) => {
        t.equal(type, types.TRIGGER_TOGGLE);
        t.equal(data, false);
      });

      proxyquire('../../../src/actions/menu', {
        '../store': store
      }).triggerToggle();
    });
  });

  t.test('__sideBarTriggerIdentify__', t => {
    t.test('properly disptaches SIDE_BAR_TRIGGER_IDENTIFY', t => {
      t.plan(1);
      const store = mockStore({}, ({type}) => {
        t.equal(type, types.SIDE_BAR_TRIGGER_IDENTIFY);
      });

      proxyquire('../../../src/actions/menu', {
        '../store': store
      }).sideBarTriggerIdentify();
    });
  });

  t.test('__unsuppressTopBarFocus__', t => {
    t.test('properly dispatches UNSUPPRESS_TOP_BAR_FOCUS', t => {
      t.plan(1);

      const store = mockStore({}, ({type}) => {
        t.equal(type, types.UNSUPPRESS_TOP_BAR_FOCUS);
      });

      proxyquire('../../../src/actions/menu', {
        '../store': store
      }).unsuppressTopBarFocus();
    });
  });
});

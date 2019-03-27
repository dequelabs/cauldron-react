import React from 'react';
import test from 'tape';
import { mount } from 'enzyme';
import '../../../helpers/setup';
import Workspace from '../../../../src/components/Workspace';

test('Workspace', t => {
  t.test(
    'manages "dqpl-no-sidebar" class on body based on noSideBar prop',
    t => {
      const workspace = mount(<Workspace noSideBar>hi</Workspace>);
      t.true(document.body.classList.contains('dqpl-no-sidebar'));
      workspace.setProps({ noSideBar: false });
      t.false(document.body.classList.contains('dqpl-no-sidebar'));
      workspace.setProps({ noSideBar: true });
      t.true(document.body.classList.contains('dqpl-no-sidebar'));
      t.end();
    }
  );
});

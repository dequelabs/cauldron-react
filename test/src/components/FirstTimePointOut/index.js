import React from 'react';
import test from 'tape';
import { shallow, mount } from 'enzyme';
import '../../../helpers/setup';
import FirstTimePointOut from '../../../../src/lib/components/FirstTimePointOut';

const defaults = { headerId: 'foo' };

test('__FirstTimePointOut Component__', t => {
  t.test('handles "noArrow" prop properly', t => {
    t.plan(1);
    const ftpo = shallow(
      <FirstTimePointOut noArrow={true} {...defaults}>{'hello'}</FirstTimePointOut>
    );

    t.ok(ftpo.hasClass('dqpl-no-arrow'));
  });

  t.test('returns null given a falsey "show" state', t => {
    t.plan(1);
    const ftpo = mount(
      <FirstTimePointOut {...defaults}>{'hello'}</FirstTimePointOut>
    );

    ftpo.setState({
      show: false
    }, () => {
      t.equal(ftpo.html(), null);
    });
  });

  t.test('calls onClose prop when close is clicked', t => {
    t.plan(1);
    const onClose = () => t.pass();
    const ftpo = mount(
      <FirstTimePointOut {...defaults} onClose={onClose}>{'hello'}</FirstTimePointOut>
    );

    ftpo.find('.dqpl-ftp-dismiss').simulate('click');
  });

  t.test('accepts the dismissText prop', t => {
    t.plan(1);
    const ftpo = mount(
      <FirstTimePointOut {...defaults} dismissText={'Fred'}>{'hello'}</FirstTimePointOut>
    );

    t.true(ftpo.find('.dqpl-ftp-dismiss[aria-label="Fred"]').exists());
  });
});

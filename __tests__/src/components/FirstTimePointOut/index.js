import React from 'react';
import { shallow, mount } from 'enzyme';
import FirstTimePointOut from '../../../../src/components/FirstTimePointOut';

const defaults = { headerId: 'foo' };

test('handles "noArrow" prop properly', () => {
  expect.assertions(1);
  const ftpo = shallow(
    <FirstTimePointOut noArrow={true} {...defaults}>
      {'hello'}
    </FirstTimePointOut>
  );

  expect(ftpo.hasClass('dqpl-no-arrow')).toBeTruthy();
});

test('handles "arrowPosition" prop', () => {
  const ftpo = shallow(
    <FirstTimePointOut arrowPosition="top-right" {...defaults}>
      {'hello'}
    </FirstTimePointOut>
  );

  expect(ftpo.find('.dqpl-arrow.top-right')).toBeTruthy();
});

test('returns null given a falsey "show" state', () => {
  expect.assertions(1);
  const ftpo = mount(
    <FirstTimePointOut {...defaults}>{'hello'}</FirstTimePointOut>
  );

  ftpo.setState(
    {
      show: false
    },
    () => {
      expect(ftpo.html()).toBe(null);
    }
  );
});

test('calls onClose prop when close is clicked', () => {
  let called = false;
  const onClose = () => (called = true);
  const ftpo = mount(
    <FirstTimePointOut {...defaults} onClose={onClose}>
      {'hello'}
    </FirstTimePointOut>
  );

  ftpo.find('.dqpl-ftpo-dismiss').simulate('click');
  expect(called).toBe(true);
});

test('accepts the dismissText prop', () => {
  expect.assertions(1);
  const ftpo = mount(
    <FirstTimePointOut {...defaults} dismissText={'Fred'}>
      {'hello'}
    </FirstTimePointOut>
  );

  expect(
    ftpo.find('.dqpl-ftpo-dismiss[aria-label="Fred"]').exists()
  ).toBeTruthy();
});

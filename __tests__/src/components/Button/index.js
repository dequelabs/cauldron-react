import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../../../src/components/Button';

test('handles primary/secondary properly', () => {
  const primary = shallow(<Button>{'Primary'}</Button>);
  const secondary = shallow(<Button secondary={true}>{'Secondary'}</Button>);

  expect(primary.hasClass('dqpl-button-primary')).toBeTruthy();
  expect(secondary.hasClass('dqpl-button-secondary')).toBeTruthy();
});

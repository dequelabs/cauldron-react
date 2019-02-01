import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import '../../../helpers/setup';
import Button from '../../../../src/components/Button';

test('__Button__', t => {
  t.test('handles primary/secondary properly', t => {
    const primary = shallow(<Button>{'Primary'}</Button>);
    const secondary = shallow(<Button secondary={true}>{'Secondary'}</Button>);

    t.ok(primary.hasClass('dqpl-button-primary'));
    t.ok(secondary.hasClass('dqpl-button-secondary'));
    t.end();
  });
});

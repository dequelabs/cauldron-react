import React from 'react';
import { mount } from 'enzyme';
import Trigger from 'src/components/OptionsMenu/OptionsMenuTrigger';
import { axe } from 'jest-axe';

test('should render children', () => {
  const child = 'hi';
  const trigger = mount(<Trigger>{child}</Trigger>);
  expect(trigger.find(child)).toBeTruthy();
});

test('should return no axe violations', async () => {
  const trigger = mount(<Trigger>Click me, I am a trigger!</Trigger>);
  expect(await axe(trigger.html())).toHaveNoViolations();
});

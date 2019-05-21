import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../../../src/components/Button';

test('should render primary button', () => {
  const defaultButton = shallow(<Button>primary</Button>);
  const button = shallow(<Button as="primary">primary</Button>);
  expect(defaultButton.hasClass('dqpl-button-primary'));
  expect(button.hasClass('dqpl-button-primary'));
});

test('should render secondary button', () => {
  const button = shallow(<Button as="secondary">secondary</Button>);
  expect(button.hasClass('dqpl-button-secondary'));
});

test('should render error button', () => {
  const button = shallow(<Button as="error">error</Button>);
  expect(button.hasClass('dqpl-button-error'));
});

test('should render button as link', () => {
  const button = shallow(<Button as="link">link</Button>);
  expect(button.hasClass('dqpl-link'));
});

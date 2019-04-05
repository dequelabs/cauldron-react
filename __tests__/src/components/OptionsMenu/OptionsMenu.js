import React from 'react';
import { mount } from 'enzyme';
import OptionsMenu from 'src/components/OptionsMenu';

const defaultProps = {
  show: false,
  id: 'foo',
  onClose: () => {}
};

test('handles a newly truthy `show` prop', () => {
  expect.assertions(1);
  const wrapper = mount(
    <OptionsMenu {...defaultProps}>
      <li>option 1</li>
      <li>option 2</li>
    </OptionsMenu>
  );

  wrapper.setProps({
    show: true
  });

  expect(document.activeElement).toBe(
    wrapper
      .find('li')
      .at(0)
      .getDOMNode()
  );
});

test('handles updates to `itemIndex` state', () => {
  expect.assertions(1);
  const wrapper = mount(
    <OptionsMenu {...defaultProps} show={true}>
      <li>option 1</li>
      <li>option 2</li>
    </OptionsMenu>
  );
  // focus the first item
  wrapper
    .find('li')
    .at(0)
    .getDOMNode()
    .focus();
  wrapper.setState({ itemIndex: 1 });
  expect(document.activeElement).toBe(
    wrapper
      .find('li')
      .at(1)
      .getDOMNode()
  );
});

test('handles up/down keydowns', () => {
  expect.assertions(3);
  const wrapper = mount(
    <OptionsMenu {...defaultProps} show={true}>
      <li>option 1</li>
      <li>option 2</li>
    </OptionsMenu>
  );
  expect(wrapper.state('itemIndex')).toBe(0);

  wrapper
    .find('li')
    .at(0)
    .simulate('keydown', { which: 40 });
  expect(wrapper.state('itemIndex')).toBe(1);

  wrapper
    .find('li')
    .at(0)
    .simulate('keydown', { which: 40 });
  expect(wrapper.state('itemIndex')).toBe(0); // circular
});

test('calls onClose given escape keydown', () => {
  let called = false;
  const onClose = () => (called = true);
  const wrapper = mount(
    <OptionsMenu {...defaultProps} show={true} onClose={onClose}>
      <li>option 1</li>
      <li>option 2</li>
    </OptionsMenu>
  );
  wrapper
    .find('li')
    .at(0)
    .simulate('keydown', { which: 27 });
  expect(called).toBe(true);
});

test('calls onClose given a tab keydown', () => {
  let called = false;
  const onClose = () => (called = true);
  const wrapper = mount(
    <OptionsMenu {...defaultProps} show={true} onClose={onClose}>
      <li>option 1</li>
      <li>option 2</li>
    </OptionsMenu>
  );
  wrapper
    .find('li')
    .at(0)
    .simulate('keydown', { which: 9 });

  expect(called).toBe(true);
});

test('handles enter / space keydowns', () => {
  expect.assertions(1);
  let clicked = false;
  const wrapper = mount(
    <OptionsMenu {...defaultProps} show={true}>
      <li>option 1</li>
      <li>option 2</li>
    </OptionsMenu>
  );
  const element = wrapper
    .find('li')
    .at(0)
    .getDOMNode();
  element.addEventListener('click', () => (clicked = true));
  wrapper
    .find('li')
    .at(0)
    .simulate('keydown', { which: 13 });

  expect(clicked).toBeTruthy();
});

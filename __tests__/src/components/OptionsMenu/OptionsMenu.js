import React from 'react';
import { mount } from 'enzyme';
import OptionsMenu from 'src/components/OptionsMenu';

const defaultProps = {
  show: false,
  id: 'foo',
  onClose: () => {}
};

const [space, enter, down, esc, tab] = [32, 13, 40, 27, 9];

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
    .simulate('keydown', { which: down });
  expect(wrapper.state('itemIndex')).toBe(1);

  wrapper
    .find('li')
    .at(0)
    .simulate('keydown', { which: down });
  expect(wrapper.state('itemIndex')).toBe(0); // circular
});

test('calls onClose given escape keydown', () => {
  let onClose = jest.fn();
  const wrapper = mount(
    <OptionsMenu {...defaultProps} show={true} onClose={onClose}>
      <li>option 1</li>
      <li>option 2</li>
    </OptionsMenu>
  );
  wrapper
    .find('li')
    .at(0)
    .simulate('keydown', { which: esc });

  expect(onClose).toBeCalled();
});

test('calls onClose given a tab keydown', () => {
  let onClose = jest.fn();
  const wrapper = mount(
    <OptionsMenu {...defaultProps} show={true} onClose={onClose}>
      <li>option 1</li>
      <li>option 2</li>
    </OptionsMenu>
  );
  wrapper
    .find('li')
    .at(0)
    .simulate('keydown', { which: tab });

  expect(onClose).toBeCalled();
});

test('handles enter / space keydowns', () => {
  expect.assertions(1);
  let clickHandler = jest.fn();
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
  element.addEventListener('click', clickHandler);
  wrapper
    .find('li')
    .at(0)
    .simulate('keydown', { which: enter });

  expect(clickHandler).toBeCalled();
});

test('fires onSelect when menu item is clicked', () => {
  const onSelect = jest.fn();
  const wrapper = mount(
    <OptionsMenu {...defaultProps} onSelect={onSelect}>
      <li>option 1</li>
      <li>option 2</li>
    </OptionsMenu>
  );
  let item = wrapper.find('li').at(0);
  let itemNode = item.getDOMNode();
  item.simulate('click', { target: itemNode });

  expect(onSelect).toBeCalled();
  expect(onSelect).toHaveBeenCalledWith(
    expect.objectContaining({ target: itemNode })
  );
});

test('fires onSelect when menu item is selected with space', () => {
  const onSelect = jest.fn();
  const wrapper = mount(
    <OptionsMenu {...defaultProps} onSelect={onSelect}>
      <li>option 1</li>
      <li>option 2</li>
    </OptionsMenu>
  );

  let item = wrapper.find('li').at(0);
  let itemNode = item.getDOMNode();

  // Synthetic events that call delegated events apparently don't bubble correctly in enzyme
  itemNode.addEventListener('click', event => {
    item.simulate('click', event);
  });

  item.simulate('keydown', { which: space, target: item.getDOMNode() });

  expect(onSelect).toBeCalled();
  expect(onSelect).toHaveBeenCalledWith(
    expect.objectContaining({ target: itemNode })
  );
});

test('fires onSelect when menu item is selected with enter', () => {
  const onSelect = jest.fn();
  const wrapper = mount(
    <OptionsMenu {...defaultProps} onSelect={onSelect}>
      <li>option 1</li>
      <li>option 2</li>
    </OptionsMenu>
  );

  let item = wrapper.find('li').at(0);
  let itemNode = item.getDOMNode();

  // Synthetic events that call delegated events apparently don't bubble correctly in enzyme
  itemNode.addEventListener('click', event => {
    item.simulate('click', event);
  });

  item.simulate('keydown', { which: enter, target: item.getDOMNode() });

  expect(onSelect).toBeCalled();
  expect(onSelect).toHaveBeenCalledWith(
    expect.objectContaining({ target: itemNode })
  );
});

test('fires onClose when menu item is selected', () => {
  const onClose = jest.fn();
  const wrapper = mount(
    <OptionsMenu {...defaultProps} onClose={onClose}>
      <li>option 1</li>
      <li>option 2</li>
    </OptionsMenu>
  );

  wrapper
    .find('li')
    .at(0)
    .simulate('click');

  expect(onClose).toBeCalled();
});

test('does not fire onClose when menu item is selected and default prevented', () => {
  const onClose = jest.fn();
  const wrapper = mount(
    <OptionsMenu {...defaultProps} onClose={onClose}>
      <li>option 1</li>
      <li>option 2</li>
    </OptionsMenu>
  );

  wrapper
    .find('li')
    .at(0)
    .simulate('click', { defaultPrevented: true });

  expect(onClose).not.toBeCalled();
});

test('does not fire onClose when menu item is selected and closeOnSelect is false', () => {
  const onClose = jest.fn();
  const wrapper = mount(
    <OptionsMenu {...defaultProps} onClose={onClose} closeOnSelect={false}>
      <li>option 1</li>
      <li>option 2</li>
    </OptionsMenu>
  );

  wrapper
    .find('li')
    .at(0)
    .simulate('click');

  expect(onClose).not.toBeCalled();
});

import React from 'react';
import { mount } from 'enzyme';
import {
  default as ExpandCollapsePanel,
  PanelTrigger
} from 'src/components/ExpandCollapsePanel';
import * as stylesheets from 'src/utils/stylesheets';

const isVisible = element => {
  const node = element.getDOMNode().parentNode;
  const style = getComputedStyle(node);

  return (
    element.exists() &&
    style.getPropertyValue('display') !== 'none' &&
    style.getPropertyValue('visibility') !== 'visible' &&
    style.getPropertyValue('opacity') > 0
  );
};

test('should render children', () => {
  const children = <div>Hello World</div>;
  const wrapper = mount(<ExpandCollapsePanel>{children}</ExpandCollapsePanel>);

  expect(wrapper.contains(children)).toBeTruthy();
});

test('should passthrough props', () => {
  const wrapper = mount(
    <ExpandCollapsePanel foo="bar">
      <div data-test />
    </ExpandCollapsePanel>
  );

  expect(
    wrapper
      .find('[data-test]')
      .parent()
      .props().foo
  ).toBe('bar');
});

test('should have hidden content when collapsed', () => {
  const wrapper = mount(
    <ExpandCollapsePanel>
      <div data-test>foo</div>
    </ExpandCollapsePanel>
  );

  expect(isVisible(wrapper.find('[data-test]'))).toBeFalsy();
});

test('should have visible content when expanded', () => {
  const wrapper = mount(
    <ExpandCollapsePanel animationTiming={0}>
      <div data-test>foo</div>
    </ExpandCollapsePanel>
  );
  wrapper.instance().setState({ isOpen: true });

  setTimeout(() => {
    expect(isVisible(wrapper.find('[data-test]'))).toBeTruthy();
  });
});

test('should render PanelTrigger', () => {
  const wrapper = mount(
    <ExpandCollapsePanel>
      <PanelTrigger />
    </ExpandCollapsePanel>
  );
  const trigger = wrapper.find('PanelTrigger');

  expect(trigger).toBeTruthy();
  expect(trigger.props().open).toBeFalsy();
  expect(trigger.props().onClick).toBeTruthy();
});

test('should call onToggle when toggled', () => {
  const handleToggle = jest.fn();
  const wrapper = mount(
    <ExpandCollapsePanel onToggle={handleToggle}>
      <PanelTrigger>Click Me</PanelTrigger>
      <div />
    </ExpandCollapsePanel>
  );

  // Manually calling the `onClick` prop here because of Enzyme oddness
  wrapper
    .find('PanelTrigger')
    .props()
    .onClick({ which: 1 });
  expect(handleToggle).toBeCalledWith(expect.objectContaining({ which: 1 }));
});

test('trigger should open panel collapsed panel', () => {
  const wrapper = mount(
    <ExpandCollapsePanel animationTiming={0}>
      <PanelTrigger />
      <div data-test />
    </ExpandCollapsePanel>
  );

  wrapper.find('PanelTrigger').simulate('click', {});

  setTimeout(() => {
    expect(isVisible(wrapper.find('[data-test]'))).toBeTruthy();
  });
});

test('trigger should close expanded panel', () => {
  const wrapper = mount(
    <ExpandCollapsePanel animationTiming={0}>
      <PanelTrigger />
      <div data-test />
    </ExpandCollapsePanel>
  );

  wrapper.setState({ isOpen: true });
  wrapper.find('PanelTrigger').simulate('click', {});

  setTimeout(() => {
    expect(isVisible(wrapper.find('[data-test]'))).toBeFalsy();
  });
});

test('should clean up injected styletags', () => {
  const cleanup = jest.spyOn(stylesheets, 'removeStyleTag');
  const wrapper = mount(
    <ExpandCollapsePanel animationTiming={0}>
      <PanelTrigger />
      <div />
    </ExpandCollapsePanel>
  );
  wrapper.setState({ isOpen: true });
  wrapper.unmount();
  expect(cleanup).toBeCalled();
});

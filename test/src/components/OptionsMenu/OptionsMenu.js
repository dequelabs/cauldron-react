import React from 'react';
import test from 'tape';
import { mount } from 'enzyme';
import OptionsMenu from 'src/lib/components/OptionsMenu';
import 'test/helpers/setup';

const defaultProps = {
  show: false,
  id: 'foo',
  onClose: () => {}
};

test('__OptionsMenu Component__', t => {
  t.test('handles a newly truthy `show` prop', t => {
    t.plan(1);
    const wrapper = mount(
      <OptionsMenu {...defaultProps}>
        <li>option 1</li>
        <li>option 2</li>
      </OptionsMenu>
    );

    wrapper.setProps({
      show: true
    });

    t.equal(
      document.activeElement,
      wrapper
        .find('li')
        .at(0)
        .getDOMNode()
    );
  });

  t.test('handles updates to `itemIndex` state', t => {
    t.plan(1);
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
    t.equal(
      document.activeElement,
      wrapper
        .find('li')
        .at(1)
        .getDOMNode()
    );
  });

  t.test('handles up/down keydowns', t => {
    t.plan(3);
    const wrapper = mount(
      <OptionsMenu {...defaultProps} show={true}>
        <li>option 1</li>
        <li>option 2</li>
      </OptionsMenu>
    );
    t.equal(wrapper.state('itemIndex'), 0);

    wrapper
      .find('li')
      .at(0)
      .simulate('keydown', { which: 40 });
    t.equal(wrapper.state('itemIndex'), 1);

    wrapper
      .find('li')
      .at(0)
      .simulate('keydown', { which: 40 });
    t.equal(wrapper.state('itemIndex'), 0); // circular
  });

  t.test('calls onClose given escape keydown', t => {
    t.plan(1);
    const onClose = () => t.pass();
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
  });

  t.test('calls onClose given a tab keydown', t => {
    t.plan(1);
    const onClose = () => t.pass();
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
  });

  t.test('handles enter / space keydowns', t => {
    t.plan(1);
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

    t.ok(clicked);
  });
});

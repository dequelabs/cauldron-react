import React from 'react';
import test from 'tape';
import { mount } from 'enzyme';
import Checkbox from 'src/lib/components/Checkbox';
import 'test/helpers/setup';

const defaultProps = {
  id: 'boognish',
  name: 'boognish',
  value: 'boognish',
  label: 'Boognish'
};

test('Checkbox Component', t => {
  t.test('handles checked prop', t => {
    const wrapper = mount(<Checkbox {...defaultProps} checked />);

    t.true(wrapper.find('.dqpl-checkbox').hasClass('fa-check-square'));
    t.false(wrapper.find('.dqpl-checkbox').hasClass('fa-square-o'));
    t.true(wrapper.find('[type="checkbox"]').getDOMNode().checked);
    t.end();
  });

  t.test('toggles checked state properly', t => {
    const wrapper = mount(<Checkbox {...defaultProps} />);
    const checkbox = wrapper.find('[type="checkbox"]');
    t.false(checkbox.getDOMNode().checked);
    t.false(wrapper.find('.dqpl-checkbox').hasClass('fa-check-o'));

    checkbox.simulate('click');

    t.true(checkbox.getDOMNode().checked);
    t.true(wrapper.find('.dqpl-checkbox').hasClass('fa-check-square'));
    t.end();
  });

  t.test('clicks the checkbox when the overlay is clicked', t => {
    let clicked = false;
    const wrapper = mount(<Checkbox {...defaultProps} />);
    wrapper.find('[type="checkbox"]').getDOMNode().addEventListener('click', () => {
      clicked = true;
    });
    wrapper.find('.dqpl-overlay-checkbox').simulate('click');
    t.true(clicked);
    t.end();
  });

  t.test('handles disabled prop', t => {
    const wrapper = mount(<Checkbox {...defaultProps} disabled />);

    t.true(wrapper.find('[type="checkbox"]').getDOMNode().disabled);
    t.true(wrapper.find('.dqpl-checkbox-disabled').exists());
    t.end();
  });

  t.test('handles focus/blur', t => {
    const wrapper = mount(<Checkbox {...defaultProps} />);

    wrapper.find('[type="checkbox"]').simulate('focus');

    t.true(wrapper.state('focused'));
    t.true(wrapper.find('.dqpl-checkbox-focused').exists());

    wrapper.find('[type="checkbox"]').simulate('blur');

    t.false(wrapper.state('focused'));
    t.false(wrapper.find('.dqpl-checkbox-focused').exists());
    t.end();
  });
});

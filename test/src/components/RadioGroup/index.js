import React from 'react';
import test from 'tape';
import { mount } from 'enzyme';
import RadioGroup from 'src/lib/components/RadioGroup';
import 'test/helpers/setup';

const defaultProps = {
  name: 'fred',
  'aria-label': 'Fred is good',
  radios: [
    { value: 'foo', id: 'foo', label: 'Foo' },
    { value: 'bar', id: 'bar', label: 'Bar', disabled: true },
    { value: 'baz', id: 'baz', label: 'Baz' },
  ],
  onChange: () => {}
};

test('RadioGroup Component', t => {
  t.test('handles `defaultValue`', t => {
    const wrapper = mount(
      <RadioGroup
      {...defaultProps}
      defaultValue={defaultProps.radios[2].value}
      />
    );

    t.true(wrapper.find('.dqpl-radio').at(2).hasClass('fa-dot-circle-o'));
    t.equal(wrapper.find('.fa-dot-circle-o').length, 1);
    t.true(wrapper.find('[type="radio"]').at(2).getDOMNode().checked);
    t.end();
  });

  t.test('handles `disabled` radio prop', t => {
    const wrapper = mount(<RadioGroup {...defaultProps} />);
    t.true(wrapper.find('.dqpl-radio').at(1).hasClass('dqpl-radio-disabled'));
    t.equal(wrapper.find('.dqpl-radio-disabled').length, 1);
    t.true(wrapper.find('[type="radio"]').at(1).getDOMNode().disabled);
    t.end();
  });

  t.test('handles focus', t => {
    const wrapper = mount(<RadioGroup {...defaultProps} />);
    t.notOk(wrapper.state('focusIndex'));
    wrapper.find('[type="radio"]').at(0).simulate('focus');
    t.equal(wrapper.state('focusIndex'), 0);
    t.true(wrapper.find('.dqpl-radio').at(0).hasClass('dqpl-radio-focused'));
    t.equal(wrapper.find('.dqpl-radio-focused').length, 1);
    t.end();
  });

  t.test('handles blur', t => {
    const wrapper = mount(<RadioGroup {...defaultProps} />);
    wrapper.find('[type="radio"]').at(0).simulate('focus');
    t.equal(wrapper.state('focusIndex'), 0);
    wrapper.find('[type="radio"]').at(0).simulate('blur');
    t.notOk(wrapper.state('focusIndex'));
    t.equal(wrapper.find('.dqpl-radio-focused').length, 0);
    t.end();
  });

  t.test('handles change', t => {
    let called = false;
    const onChange = () => called = true;
    const wrapper = mount(<RadioGroup {...defaultProps} onChange={onChange} />);
    wrapper.find('[type="radio"]').at(0).simulate('change');
    t.true(called);
    t.equal(wrapper.state('value'), defaultProps.radios[0].value);
    t.end();
  });
});

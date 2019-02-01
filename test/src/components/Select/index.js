import React from 'react';
import test from 'tape';
import { mount } from 'enzyme';
import Select from 'src/components/Select';
import 'test/helpers/setup';

const defaultProps = {
  label: 'Fred',
  selectedId: 'fred-selected',
  listId: 'fred-list'
};
const withDefaultSelected = (otherProps = {}) => {
  return mount(
    <Select
      {...defaultProps}
      {...otherProps}
      value="Bill"
      options={[
        { value: 'Fred' },
        { value: 'Bill' },
        { value: 'Ted' },
        { value: 'Bob' }
      ]}
    />
  );
};
const basicSelect = (otherProps = {}) => {
  return mount(
    <Select
      {...defaultProps}
      {...otherProps}
      options={[{ value: 'a' }, { value: 'b' }, { value: 'c' }]}
    />
  );
};

test('Select', t => {
  t.test('renders the expected UI', t => {
    const wrapper = withDefaultSelected();

    t.true(wrapper.find('.dqpl-field-wrap').exists());
    t.true(wrapper.find('.dqpl-label'));
    t.true(wrapper.find('.dqpl-combobox'));
    t.true(wrapper.find('.dqpl-listbox'));
    t.end();
  });

  t.test('clicking the label, focuses the combobox', t => {
    const wrapper = withDefaultSelected();
    wrapper.find('.dqpl-label').simulate('click');

    t.equal(wrapper.instance().select, document.activeElement);
    t.end();
  });

  t.test('handles initially selected option', t => {
    const select = withDefaultSelected();

    t.equal(select.state('activeIndex'), 1);
    t.equal(select.state('selectedIndex'), 1);
    t.equal(select.find('.dqpl-pseudo-value').text(), 'Bill');
    t.end();
  });

  t.test(
    'handles programmatically selecting an option (via the `value` prop)',
    t => {
      let called = false;
      const select = basicSelect({
        onSelect: () => (called = true)
      });
      select.setProps({
        value: 'c'
      });

      t.equal(select.state('selectedIndex'), 2);
      t.equal(select.state('activeIndex'), 2);
      t.true(called);
      t.end();
    }
  );

  t.test('sets option attributes properly', t => {
    const select = mount(
      <Select
        {...defaultProps}
        value="a"
        options={[
          { value: 'a' },
          { disabled: true, value: 'b' },
          { value: 'c' }
        ]}
      />
    );
    const opts = select.find('.dqpl-option[role="option"]');
    t.equal(opts.length, 3);
    opts.forEach((opt, i) => {
      t.equal(opt.hasClass('dqpl-option-active'), i == 0);
      t.true(opt.is({ 'aria-selected': i === 0 }));
      t[i === 1].call(null, opt.is({ 'aria-disabled': true }));
    });

    t.end();
  });

  t.test('clicking the combobox toggles the "expanded" state', t => {
    const wrapper = basicSelect();
    const combobox = wrapper.find('[role="combobox"]');
    combobox.simulate('click');
    t.true(wrapper.state('expanded'));
    combobox.simulate('click');
    t.false(wrapper.state('expanded'));
    t.end();
  });

  t.test('given a collapsed list', t => {
    t.test('handles "down" arrow key', t => {
      const wrapper = basicSelect();
      t.false(wrapper.state('expanded'));
      wrapper.find('[role="combobox"]').simulate('keydown', { which: 40 });
      t.true(wrapper.state('expanded'));
      t.end();
    });

    t.test('handles "space" key', t => {
      const wrapper = basicSelect();
      t.false(wrapper.state('expanded'));
      wrapper.find('[role="combobox"]').simulate('keydown', { which: 32 });
      t.true(wrapper.state('expanded'));
      t.end();
    });
  });

  t.test('given an expanded list', t => {
    t.test('handles clicks on options', t => {
      let called = false;
      const select = withDefaultSelected({
        onSelect: () => (called = true)
      });
      select
        .find('.dqpl-option')
        .at(3)
        .simulate('click');

      t.equal(select.state('activeIndex'), 3);
      t.equal(select.state('selectedIndex'), 3);
      t.true(called);
      t.equal(select.instance().select, document.activeElement);
      t.end();
    });

    t.test('handles "down" arrow key', t => {
      const wrapper = withDefaultSelected();
      wrapper.setState({ expanded: true });
      t.equal(wrapper.state('activeIndex'), 1);
      wrapper.find('[role="combobox"]').simulate('keydown', { which: 40 });
      t.equal(wrapper.state('activeIndex'), 2);
      t.end();
    });

    t.test('handles "up" arrow key', t => {
      const wrapper = withDefaultSelected();
      wrapper.setState({ expanded: true });
      t.equal(wrapper.state('activeIndex'), 1);

      wrapper.find('[role="combobox"]').simulate('keydown', { which: 38 });
      t.equal(wrapper.state('activeIndex'), 0);
      t.end();
    });

    t.test('handles "esc" / "tab" keys', t => {
      const wrapper = withDefaultSelected();
      wrapper.setState({ expanded: true, activeIndex: 0 });
      wrapper.find('[role="combobox"]').simulate('keydown', { which: 27 });
      t.false(wrapper.state('expanded'));
      t.equal(wrapper.state('activeIndex'), 1);
      t.end();
    });

    t.test('handles "enter" / "space" keys', t => {
      const wrapper = withDefaultSelected();
      t.equal(wrapper.state('selectedIndex'), 1);
      wrapper.setState({ expanded: true, activeIndex: 2 });
      wrapper.find('[role="combobox"]').simulate('keydown', { which: 13 });
      t.equal(wrapper.state('selectedIndex'), 2);
      t.end();
    });

    t.test('handles searching', t => {
      const wrapper = mount(
        <Select
          {...defaultProps}
          value="Bar"
          options={[
            { value: 'Bar' },
            { value: 'Foo' },
            { value: 'Far' },
            { value: 'Fan' },
            { value: 'Fun' }
          ]}
        />
      );
      // open the list
      wrapper.setState({ expanded: true });
      // fire an "f" keydown
      wrapper.find('[role="combobox"]').simulate('keydown', { which: 70 });
      t.equal(wrapper.state('activeIndex'), 1);
      // fire a "u" keydown
      wrapper.find('[role="combobox"]').simulate('keydown', { which: 85 });
      t.equal(wrapper.state('activeIndex'), 4);
      t.end();
    });
  });

  t.test('skips disabled items', t => {
    const wrapper = mount(
      <Select
        {...defaultProps}
        options={[
          { value: 'one' },
          { value: 'two', disabled: true },
          { value: 'three' }
        ]}
      />
    );
    wrapper.setState({ expanded: true });
    wrapper.find('[role="combobox"]').simulate('keydown', { which: 40 });
    t.equal(wrapper.state('activeIndex'), 2);
    t.end();
  });

  t.test('handles top/bottom boundaries', t => {
    const wrapper = basicSelect();
    wrapper.setState({ expanded: true, activeIndex: 0 });
    wrapper.find('[role="combobox"]').simulate('keydown', { which: 38 });
    t.equal(wrapper.state('activeIndex'), 0);
    wrapper.setState({ activeIndex: 2 });
    wrapper.find('[role="combobox"]').simulate('keydown', { which: 40 });
    t.equal(wrapper.state('activeIndex'), 2);
    t.end();
  });
});

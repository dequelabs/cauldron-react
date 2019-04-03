import React from 'react';
import test from 'tape';
import { mount } from 'enzyme';
import '../../../helpers/setup';
import TextField from '../../../../src/components/TextField';

test('TextField', t => {
  t.test('controlled field', t => {
    let input;
    const field = mount(
      <TextField label="Fred" value="" inputRef={el => (input = el)} />
    );

    t.equal(input.value, '');
    field.setProps({
      value: 'bar'
    });
    t.equal(input.value, 'bar');
    t.end();
  });

  t.test('uncontrolled field', t => {
    let input;
    const field = mount(
      <TextField
        label="Fred"
        defaultValue="foo"
        inputRef={el => (input = el)}
      />
    );

    t.equal(input.value, 'foo');
    input.value = 'bar';
    field.instance().onChange({});
    t.equal(field.state('value'), 'bar');
    t.end();
  });
});

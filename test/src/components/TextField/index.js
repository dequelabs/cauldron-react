import React from 'react';
import test from 'tape';
import { mount } from 'enzyme';
import '../../../helpers/setup';
import TextField from '../../../../src/components/TextField';

test('TextField', t => {
  t.test('controlled field', t => {
    let input;
    const field = mount(
      <TextField label="Fred" value="" fieldRef={el => (input = el)} />
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
        fieldRef={el => (input = el)}
      />
    );

    t.equal(input.value, 'foo');
    input.value = 'bar';
    field.instance().onChange({});
    t.equal(field.state('value'), 'bar');
    t.end();
  });

  t.test('multiline=true renders textarea', t => {
    mount(
      <TextField
        multiline
        label="Yo"
        fieldRef={element => {
          t.is(element.tagName, 'TEXTAREA');
          t.end();
        }}
      />
    );
  });

  t.test('multiline=false renders input', t => {
    mount(
      <TextField
        multline={false}
        label="Yo"
        fieldRef={element => {
          t.is(element.tagName, 'INPUT');
          t.end();
        }}
      />
    );
  });
});

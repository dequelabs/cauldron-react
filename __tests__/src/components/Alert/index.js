import React from 'react';
import { mount } from 'enzyme';
import Alert from '../../../../src/components/Alert';

test('returns null if passed a falsey "show" prop', () => {
  expect.assertions(1);
  const alert = mount(<Alert show={false}>{'hello'}</Alert>);

  expect(alert.html()).toBe(null);
  alert.unmount();
});

test('focuses content when passed a truthy "show" prop upon mounting', done => {
  const alert = mount(<Alert show={true}>{'hello'}</Alert>);

  setTimeout(() => {
    // setting timeout to wait for fade-in (like the src does)
    expect(document.activeElement).toBe(alert.instance().content);
    alert.unmount();
    done();
  }, 10);
});

test('focuses content when "show" prop is updated from falsey to truthy', done => {
  const alert = mount(<Alert show={false}>{'hello'}</Alert>);

  alert.setProps({ show: true }, () => {
    setTimeout(() => {
      expect(document.activeElement).toBe(alert.instance().content);
      alert.unmount();
      done();
    }, 10);
  });
});

test('calls onClose when a "show" prop is updated from truthy to falsey', () => {
  let called = false;
  const alert = mount(
    <Alert show={true} onClose={() => (called = true)}>
      {'hello'}
    </Alert>
  );

  alert.setProps({ show: false });
  expect(called).toBe(true);
});

test('supports the "contentRef" prop', () => {
  let called = false;
  expect.assertions(1);
  const alert = mount(
    <Alert show={true} contentRef={() => (called = true)}>
      {'Hi'}
    </Alert>
  );

  expect(called).toBeTruthy();
  alert.unmount();
});

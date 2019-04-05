import React from 'react';
import { mount } from 'enzyme';
import Modal from '../../../../src/components/Modal';

const defaults = { show: false, heading: { text: 'hi' } };

test('returns null if passed a falsey "show" prop', () => {
  expect.assertions(1);
  const modal = mount(<Modal {...defaults}>{'hello'}</Modal>);

  expect(modal.html()).toBe(null);
});

test('focuses heading when mounted with a truthy "show" prop', done => {
  const modal = mount(
    <Modal {...defaults} show={true}>
      {'hello'}
    </Modal>
  );

  setTimeout(() => {
    // setting timeout to wait for fade-in (like the src does)
    expect(document.activeElement).toBe(modal.instance().heading);
    modal.unmount();
    done();
  }, 10);
});

test('focuses heading when "show" prop is updated from falsey to truthy', done => {
  const modal = mount(<Modal {...defaults}>{'hello'}</Modal>);

  modal.setProps({ show: true }, () => {
    setTimeout(() => {
      expect(document.activeElement).toBe(modal.instance().heading);
      modal.unmount();
      done();
    }, 10);
  });
});

test('calls onClose when a "show" prop is updated from truthy to falsey', () => {
  let called = false;
  const modal = mount(
    <Modal {...defaults} show={true} onClose={() => (called = true)}>
      {'hello'}
    </Modal>
  );

  modal.setProps({ show: false });
  expect(called).toBe(true);
});

test('supports the "modalRef" prop', () => {
  let called = false;
  expect.assertions(1);
  const modalRef = () => (called = true);
  const modal = mount(
    <Modal {...defaults} show={true} modalRef={modalRef}>
      {'Hi'}
    </Modal>
  );
  expect(called).toBeTruthy();
  modal.unmount();
});

test('passes additional props through to dialog element', () => {
  let called = false;
  const modal = mount(
    <Modal
      {...defaults}
      show={true}
      data-foo="true"
      onKeyDown={() => (called = true)}
    >
      {'hi'}
    </Modal>
  );

  modal.find('[role="dialog"]').simulate('keydown', { which: 9 });

  expect(called).toBeTruthy();
  expect(modal.find('[data-foo="true"]').exists()).toBeTruthy();
});

test('does not render the close button given a thruthy "forceAction" prop', () => {
  expect.assertions(1);
  const modal = mount(
    <Modal {...defaults} show={true} forceAction={true}>
      {'hello'}
    </Modal>
  );

  expect(modal.find('.dqpl-close').exists()).toBeFalsy();
  modal.unmount();
});

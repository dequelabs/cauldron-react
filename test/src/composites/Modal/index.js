import React from 'react';
import PropTypes from 'prop-types';
import test from 'tape';
import proxyquire from 'proxyquire';
import { mount } from 'enzyme';
import '../../../helpers/setup';

proxyquire.noCallThru();

const FocusTrap = ({children}) => (<div>{children}</div>);
const Scrim = () => (<div />);
FocusTrap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ])
};
const defaults = { show: false, heading: { text: 'hi' } };
const Modal = proxyquire('../../../../src/lib/composites/Modal', {
  'focus-trap-react': FocusTrap,
  '../../commons/Scrim': Scrim
}).default;

test('__Modal Composite__', t => {
  t.test('returns null if passed a falsey "show" prop', t => {
    t.plan(1);
    const modal = mount(
      <Modal {...defaults}>{'hello'}</Modal>
    );

    t.equal(modal.html(), null);
  });

  t.test('focuses heading when mounted with a truthy "show" prop', t => {
    t.plan(1);
    const modal = mount(
      <Modal {...defaults} show={true}>{'hello'}</Modal>
    );

    setTimeout(() => { // setting timeout to wait for fade-in (like the src does)
      t.equal(document.activeElement, modal.instance().heading);
      modal.unmount();
    }, 10);
  });

  t.test('focuses heading when "show" prop is updated from falsey to truthy', t => {
    t.plan(1);
    const modal = mount(
      <Modal {...defaults}>{'hello'}</Modal>
    );

    modal.setProps({ show: true }, () => {
      setTimeout(() => {
        t.equal(document.activeElement, modal.instance().heading);
        modal.unmount();
      }, 10);
    });
  });

  t.test('calls onClose when a "show" prop is updated from truthy to falsey', t => {
    t.plan(1);
    const modal = mount(
      <Modal
        {...defaults}
        show={true}
        onClose={() => {
          t.pass();
          modal.unmount();
        }}
      >
        {'hello'}
      </Modal>
    );

    modal.setProps({ show: false });
  });

  t.test('supports the "modalRef" prop', t => {
    let called = false;
    t.plan(1);
    const modalRef = () => called = true;
    const modal = mount(<Modal {...defaults} show={true} modalRef={modalRef}>{'Hi'}</Modal>);
    t.ok(called);
    modal.unmount();
  });

  t.test('does not render the close button given a thruthy "forceAction" prop', t => {
    t.plan(1);
    const modal = mount(
      <Modal {...defaults} show={true} forceAction={true}>{'hello'}</Modal>
    );

    t.notOk(modal.find('.dqpl-close').exists());
    modal.unmount();
  });
});

import React from 'react';
import test from 'tape';
import { mount } from 'enzyme';
import Toast from 'src/components/Toast';
import 'test/helpers/setup';

const defaultProps = {
  type: 'confirmation',
  show: false
};

test('__Toast__', t => {
  t.test('handles initial show prop on mount', t => {
    t.plan(2);
    const wrapper = mount(
      <Toast {...defaultProps} show={true}>
        {'hi'}
      </Toast>
    );

    setTimeout(() => {
      t.equal(document.activeElement, wrapper.find('.dqpl-toast').getDOMNode());
      t.ok(wrapper.find('.dqpl-toast').hasClass('dqpl-fadein-setup'));
    }); // wait for animation timeouts / async setState calls
  });

  t.test('handles autoHide properly', t => {
    t.plan(1);
    mount(
      <Toast
        {...defaultProps}
        show={true}
        autoHide={10}
        onDismiss={() => t.pass('calls onDismiss')}
      >
        {'hi'}
      </Toast>
    );
  });

  t.test('handles transition from falsey show to truthy show prop', t => {
    t.plan(2);

    const wrapper = mount(<Toast {...defaultProps}>{'hi'}</Toast>);
    t.notOk(wrapper.find('.dqpl-toast').hasClass('dqpl-fadein-setup'));

    wrapper.setProps({ show: true });
    setTimeout(() => {
      t.ok(wrapper.find('.dqpl-toast').hasClass('dqpl-fadein-setup'));
    }); // wait for animation timeouts / async setState calls
  });

  t.test('handles transition from truthy show to falsey show prop', t => {
    t.plan(1);
    const wrapper = mount(
      <Toast {...defaultProps} show={true}>
        {'hi'}
      </Toast>
    );
    wrapper.setProps({ show: false });

    setTimeout(() => {
      // there is a bug relating to enzyme's hasClass so I am forced to use `getDOMNode()` here
      // see https://github.com/airbnb/enzyme/issues/1170
      t.ok(
        wrapper
          .find('.dqpl-toast')
          .getDOMNode()
          .classList.contains('dqpl-hidden')
      );
    }); // wait for animation timeouts / async setState calls
  });

  t.test('renders the expected UI (icons classNames etc)', t => {
    t.plan(6);

    const confirmation = mount(
      <Toast {...defaultProps} show={true}>
        {'hi'}
      </Toast>
    );
    t.ok(confirmation.find('.dqpl-toast.dqpl-toast-success').exists());
    t.ok(confirmation.find('.fa-info-circle').exists());

    const caution = mount(
      <Toast {...defaultProps} type={'caution'} show={true}>
        {'hi'}
      </Toast>
    );
    t.ok(caution.find('.dqpl-toast.dqpl-toast-warning').exists());
    t.ok(caution.find('.fa-warning').exists());

    const actionNeeded = mount(
      <Toast {...defaultProps} type={'action-needed'} show={true}>
        {'hi'}
      </Toast>
    );
    t.ok(actionNeeded.find('.dqpl-toast.dqpl-toast-error').exists());
    t.ok(actionNeeded.find('.fa-minus-circle').exists());
  });

  t.test('handles "action-needed" type', t => {
    t.plan(2);

    const wrapper = mount(
      <Toast {...defaultProps} show={true} type={'action-needed'}>
        {'hi'}
      </Toast>
    );

    setTimeout(() => {
      t.notOk(wrapper.find('.dqpl-toast-dismiss').exists());
      t.ok(wrapper.find('.dqpl-scrim-light').exists());
    }); // wait for animation timeouts / async setState calls
  });

  t.test('clicking the dismiss button properly dismisses toast', t => {
    t.plan(1);
    const wrapper = mount(
      <Toast
        {...defaultProps}
        show={true}
        onDismiss={() => t.pass('dismisses')}
      >
        {'hi'}
      </Toast>
    );
    wrapper.find('.dqpl-toast-dismiss').simulate('click');
  });
});

import React from 'react';
import PropTypes from 'prop-types';
import test from 'tape';
import proxyquire from 'proxyquire';
import { mount } from 'enzyme';
import '../../../helpers/setup';

proxyquire.noCallThru();

const FocusTrap = ({ children }) => <div>{children}</div>;
const Scrim = () => <div />;
FocusTrap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ])
};

const Alert = proxyquire('../../../../src/lib/composites/Alert', {
  'focus-trap-react': FocusTrap,
  '../../commons/Scrim': Scrim
}).default;

test('__Alert Composite__', t => {
  t.test('returns null if passed a falsey "show" prop', t => {
    t.plan(1);
    const alert = mount(<Alert show={false}>{'hello'}</Alert>);

    t.equal(alert.html(), null);
    alert.unmount();
  });

  t.test(
    'focuses content when passed a truthy "show" prop upon mounting',
    t => {
      t.plan(1);
      const alert = mount(<Alert show={true}>{'hello'}</Alert>);

      setTimeout(() => {
        // setting timeout to wait for fade-in (like the src does)
        t.equal(document.activeElement, alert.instance().content);
        alert.unmount();
      }, 10);
    }
  );

  t.test(
    'focuses content when "show" prop is updated from falsey to truthy',
    t => {
      t.plan(1);
      const alert = mount(<Alert show={false}>{'hello'}</Alert>);

      alert.setProps({ show: true }, () => {
        setTimeout(() => {
          t.equal(document.activeElement, alert.instance().content);
          alert.unmount();
        }, 10);
      });
    }
  );

  t.test(
    'calls onClose when a "show" prop is updated from truthy to falsey',
    t => {
      t.plan(1);
      const alert = mount(
        <Alert
          show={true}
          onClose={() => {
            t.pass();
            alert.unmount();
          }}
        >
          {'hello'}
        </Alert>
      );

      alert.setProps({ show: false });
    }
  );

  t.test('supports the "contentRef" prop', t => {
    let called = false;
    t.plan(1);
    const alert = mount(
      <Alert show={true} contentRef={() => (called = true)}>
        {'Hi'}
      </Alert>
    );

    t.ok(called);
    alert.unmount();
  });
});

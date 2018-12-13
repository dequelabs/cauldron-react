import test from 'tape';
import React from 'react';
import { shallow, mount } from 'enzyme';
import Scrim from '../../../../src/lib/commons/Scrim';

test('__commons/Scrim__', t => {
  t.test('given a initial truthy `show` prop, fades scrim in', t => {
    t.plan(2);

    const scrim = mount(<Scrim show={true} />);
    t.equal(scrim.state('animationClass'), 'dqpl-scrim-show');
    setTimeout(() => {
      // wait for setState to complete
      t.equal(
        scrim.state('animationClass'),
        'dqpl-scrim-show dqpl-scrim-fade-in'
      );
    });
  });

  t.test(
    'given a `show` prop update from falsey to truthy, calls fadeIn',
    t => {
      t.plan(3);

      const scrim = mount(<Scrim show={false} />);
      t.equal(scrim.state('animationClass'), '');

      scrim.setProps({ show: true });
      t.equal(scrim.state('animationClass'), 'dqpl-scrim-show');
      setTimeout(() => {
        // wait for setState to complete
        t.equal(
          scrim.state('animationClass'),
          'dqpl-scrim-show dqpl-scrim-fade-in'
        );
      });
    }
  );

  t.test(
    'given a `show` props update from truthy to falsey, calls fadeOut',
    t => {
      t.plan(2);

      const scrim = mount(<Scrim show={true} />);
      setTimeout(() => {
        // wait for setState to complete
        t.equal(
          scrim.state('animationClass'),
          'dqpl-scrim-show dqpl-scrim-fade-in'
        );

        scrim.setProps({ show: false });

        setTimeout(() => {
          t.equal(scrim.state('animationClass'), '');
        }, 100);
      });
    }
  );

  t.test('return null given a falsey `show` prop', t => {
    t.plan(1);
    const wrapper = shallow(<Scrim show={false} />);
    t.equal(wrapper.html(), null);
  });
});

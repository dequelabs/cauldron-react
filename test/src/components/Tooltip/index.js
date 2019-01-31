import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import '../../../helpers/setup';
import Tooltip from '../../../../src/components/Tooltip';

test('Tooltip', t => {
  t.test('renders without blowing up', t => {
    const tip = shallow(
      <Tooltip id="foo" overlay={<span>boognish</span>}>
        <button className="bar" aria-describedby="foo">
          bar
        </button>
      </Tooltip>
    );
    t.true(tip.find('.bar').exists());
    t.end();
  });
});

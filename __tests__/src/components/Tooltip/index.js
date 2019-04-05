import React from 'react';
import { shallow } from 'enzyme';
import Tooltip from '../../../../src/components/Tooltip';

test('renders without blowing up', () => {
  const tip = shallow(
    <Tooltip id="foo" overlay={<span>boognish</span>}>
      <button className="bar" aria-describedby="foo">
        bar
      </button>
    </Tooltip>
  );
  expect(tip.find('.bar').exists()).toBeTruthy();
});

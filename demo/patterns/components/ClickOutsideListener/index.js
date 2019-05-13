import React from 'react';
import Highlight from '../../../Highlight';
import { ClickOutsideListener } from 'src/';

const Demo = () => (
  <div>
    <h1>Click Outside Listener</h1>
    <h2>Demo</h2>
    <ClickOutsideListener
      onClickOutside={() => alert('You clicked outside of me.')}
    >
      <button type="button" className="dqpl-button-primary">
        Click Inside
      </button>
    </ClickOutsideListener>
    <h2>Code Sample</h2>
    <Highlight language="javascript">
      {`
import React from 'react';
import { ClickOutsideListener } from 'cauldron-react';

const Demo = () => (
  <ClickOutsideListener onClickOutside={() => alert('You clicked outside of me.')}>
    <button type="button" className="dqpl-button-primary">Click Inside</button>
  </ClickOutsideListener>
);
      `}
    </Highlight>
  </div>
);

export default Demo;

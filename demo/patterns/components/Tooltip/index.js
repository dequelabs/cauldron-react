import React from 'react';
import Highlight from '../../../Highlight';
import { Tooltip, Button } from 'src/';

const Demo = () => (
  <div>
    <h1>Tooltip</h1>
    <h2>Demo</h2>
    <Tooltip overlay={<span>Tooltip aligned above trigger</span>} id="tool-top">
      <Button secondary aria-describedby="tool-top">
        Top
      </Button>
    </Tooltip>
    <Tooltip
      overlay={<span>Tooltip aligned to the right of trigger</span>}
      id="tool-right"
      placement="right"
    >
      <Button secondary aria-describedby="tool-right">
        Right
      </Button>
    </Tooltip>
    <Tooltip
      overlay={<span>Tooltip aligned below the trigger</span>}
      id="tool-bottom"
      placement="bottom"
    >
      <Button secondary aria-describedby="tool-bottom">
        Bottom
      </Button>
    </Tooltip>
    <Tooltip
      overlay={<span>Tooltip aligned to the left of trigger</span>}
      id="tool-left"
      placement="left"
    >
      <Button secondary aria-describedby="tool-left">
        Left
      </Button>
    </Tooltip>
    <h2>Code Sample</h2>
    <Highlight language="javascript">
      {`
import React from 'react';
import { Tooltip, Button } from 'cauldron-react';

const Demo = () => (
  <div>
    <Tooltip
      overlay={<span>Tooltip aligned above trigger</span>}
      id='tool-top'
    >
      <Button secondary aria-describedby='tool-top'>Top</Button>
    </Tooltip>
    <Tooltip
      overlay={<span>Tooltip aligned to the right of trigger</span>}
      id='tool-right'
      placement='right'
    >
      <Button secondary aria-describedby='tool-right'>Right</Button>
    </Tooltip>
    <Tooltip
      overlay={<span>Tooltip aligned below the trigger</span>}
      id='tool-bottom'
      placement='bottom'
    >
      <Button secondary aria-describedby='tool-bottom'>Bottom</Button>
    </Tooltip>
    <Tooltip
      overlay={<span>Tooltip aligned to the left of trigger</span>}
      id='tool-left'
      placement='left'
    >
      <Button secondary aria-describedby='tool-left'>Left</Button>
    </Tooltip>
  </div>
);
      `}
    </Highlight>
  </div>
);

export default Demo;

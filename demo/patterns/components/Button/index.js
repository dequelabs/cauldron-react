import React from 'react';
import Highlight from 'demo/Highlight';
import { Button } from 'src/';

const Demo = () => (
  <div>
    <h1>Buttons</h1>
    <h2>Demo</h2>
    <Button>Primary</Button>
    <Button disabled>Primary Disabled</Button>
    <Button as="secondary">Secondary</Button>
    <Button as="secondary" disabled>
      Secondary Disabled
    </Button>
    <Button as="error">Error</Button>
    <Button as="error" disabled>
      Error Disabled
    </Button>
    <Button as="link">Link</Button>
    <h2>Code Sample</h2>
    <Highlight language="javascript">
      {`
import React from 'react';
import { Button } from 'cauldron-react';

const Demo = () => (
  <section>
    <Button>Primary</Button>
    <Button disabled>Primary Disabled</Button>
    <Button as="secondary">Secondary</Button>
    <Button as="secondary" disabled>Secondary Disabled</Button>
    <Button as="error">Error</Button>
    <Button as="error" disabled>Error Disabled</Button>
    <Button as="link">Link</Button>
  </section>
);
      `}
    </Highlight>
  </div>
);

export default Demo;

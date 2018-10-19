import React from 'react';
import Highlight from 'demo/Highlight';
import { Button } from 'src/';

const Demo = () => (
  <div>
    <h1>Buttons</h1>
    <h2>Demo</h2>
    <Button>{'Primary'}</Button>
    <Button secondary={true}>{'Secondary'}</Button>
    <Button secondary={true} disabled={true}>
      {'Disabled'}
    </Button>
    <h2>Code Sample</h2>
    <Highlight language="javascript">
      {`
import React from 'react';
import { Button } from 'cauldron-react';

const Demo = () => (
  <section>
    <Button>{'Primary'}</Button>
    <Button secondary={true}>{'Secondary'}</Button>
    <Button secondary={true} disabled={true}>{'Disabled'}</Button>
  </section>
);
      `}
    </Highlight>
  </div>
);

export default Demo;

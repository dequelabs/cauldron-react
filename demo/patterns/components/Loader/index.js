import React from 'react';
import Highlight from '../../../Highlight';
import { Loader } from 'src/';

const Demo = () => (
  <div>
    <h1>Loader</h1>
    <h2>Demo</h2>
    <Loader label={'Loading'} />
    <h2>Code Sample</h2>
    <Highlight language='javascript'>
      {`
import React from 'react';
import { Loader } from 'cauldron-react';

const Demo = () => (<Loader label={'Loading'} />);
      `}
    </Highlight>
  </div>
);

export default Demo;

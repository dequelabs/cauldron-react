import React from 'react';
import Highlight from '../../../Highlight';
import { TextInput } from 'src/';

const Demo = () => (
  <div className="foo">
    <h1>TextInput</h1>
    <h2>Demo</h2>
    <TextInput label="Email" />
    <h2>Code Sample</h2>
    <Highlight language="javascript">
      {`
import React from 'react';
import {
  TextInput
} from 'cauldron-react';

const Demo = () => (
  <TextInput
    error={<span>Email is invalid</span>}
    label={<span>Email</span>}
    type='text'
    onChange={(value, e)=>{}}
    value='foo@bar.baz' // or defaultValue (controlled vs uncontrolled)
  />
);
      `}
    </Highlight>
  </div>
);

export default Demo;

import React from 'react';
import Highlight from '../../../Highlight';
import { Select, SelectOption, Button } from 'src/';
import './index.css';

const Demo = () => (
  <div className='select-demo'>
    <h1>Select</h1>
    <h2>Demo</h2>
    <div>
      <Select
        label={'Day'}
        selectedId='day-selected'
        listId='day-list'
      >
        <SelectOption selected value='Monday' />
        <SelectOption value='Tuesday' />
        <SelectOption value='Wednesday' />
        <SelectOption value='Thursday' />
        <SelectOption value='Friday' />
        <SelectOption disabled={true} value='Saturday' />
        <SelectOption value='Sunday' />
      </Select>
      <Button className='select-demo-button'>Submit</Button>
    </div>
    <h2>Code Sample</h2>
    <Highlight language='javascript'>
      {`
import React from 'react';
import { Select, SelectOption } from 'cauldron-react';

const Demo = () => (
  <Select
    label={'Day'}
    selectedId='day-selected'
    listId='day-list'
    onSelect={({ value }) => console.log(\`Selection: \${value}\`)}
  >
    <SelectOption value='Monday' />
    <SelectOption value='Tuesday' />
    <SelectOption value='Wednesday' />
    <SelectOption value='Thursday' />
    <SelectOption selected value='Friday' />
    <SelectOption disabled value='Saturday' />
    <SelectOption value='Sunday' />
  </Select>
);
      `}
    </Highlight>
  </div>
);

export default Demo;

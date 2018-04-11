import React from 'react';
import Highlight from '../../../Highlight';
import { Select, Button } from 'src/';
import './index.css';

const Demo = () => (
  <div className='select-demo'>
    <h1>Select</h1>
    <h2>Demo</h2>
    <div>
      <Select
        label='Day'
        selectedId='day-selected'
        listId='day-list'
        options={[
          { label: 'Monday', selected: true },
          { label: 'Tuesday' },
          { label: 'Wednesday' },
          { label: 'Thursday' },
          { label: 'Friday' },
          { label: 'Saturday', disabled: true },
          { label: 'Sunday' }
        ]}
      />
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

import React from 'react';
import Highlight from 'demo/Highlight';
import { Checkbox, Button } from 'src/';
import './index.css';

const Demo = () => (
  <div>
    <h1>Checkbox</h1>
    <h2>Demo</h2>
    <h3 id="foods-label">Choose your favorite foods</h3>
    <div role="group" aria-labelledby="foods-label">
      <Checkbox
        checked
        id="artichokes"
        name="foods"
        value="artichokes"
        label="Artichokes"
      />
      <Checkbox disabled id="liver" name="foods" value="liver" label="Liver" />
      <Checkbox id="mangos" name="foods" value="mangos" label="Mangos" />
      <Checkbox id="falafel" name="foods" value="falafel" label="Falafel" />
    </div>
    <Button className="food-submit">Submit</Button>
    <h2>Code Sample</h2>
    <Highlight language="javascript">
      {`
  import React from 'react';
  import { Checkbox, Button } from 'cauldron-react';

  const Demo = () => (
    <div>
      <h3 id='foods-label'>Choose your favorite foods</h3>
      <div role='group' aria-labelledby='foods-label'>
        <Checkbox checked id='artichokes' name='foods' value='artichokes' label='Artichokes' />
        <Checkbox disabled id='liver' name='foods' value='liver' label='Liver' />
        <Checkbox id='mangos' name='foods' value='mangos' label='Mangos' />
        <Checkbox id='falafel' name='foods' value='falafel' label='Falafel' />
      </div>
      <Button className='food-submit'>Submit</Button>
    </div>
  );
      `}
    </Highlight>
  </div>
);

export default Demo;

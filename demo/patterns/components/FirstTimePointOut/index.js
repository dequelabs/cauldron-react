import React from 'react';
import Highlight from '../../../Highlight';
import { FirstTimePointOut } from '../../../../';

const Demo = () => (
  <div>
    <h1>First Time Point Out</h1>
    <h2>Demo</h2>
    <h3>With Arrow</h3>
    <FirstTimePointOut headerId={'ftpo-head'}>
      <h4 id={'ftpo-head'}>First time point out!</h4>
      <p>This is a first time point out with a pointer</p>
    </FirstTimePointOut>
    <h3>Without Arrow</h3>
    <FirstTimePointOut headerId={'ftpo-head-no-arrow'} noArrow={true}>
      <h4 id={'ftpo-head-no-arrow'}>First time point out!</h4>
      <p>This is a first time point out without a pointer</p>
    </FirstTimePointOut>
    <h2>Code Sample</h2>
    <Highlight language='javascript'>
      {`
import React from 'react';
import { FirstTimePointOut } from 'react-cauldron';

const Demo = () => (
  <section>
    <FirstTimePointOut headerId={'ftpo-head'}>
      <h4 id={'ftpo-head'}>First time point out!</h4>
      <p>This is a first time point out with a pointer</p>
    </FirstTimePointOut>
    <h2>Without Arrow</h2>
    <FirstTimePointOut headerId={'ftpo-head-no-arrow'} noArrow={true}>
      <h4 id={'ftpo-head-no-arrow'}>First time point out!</h4>
      <p>This is a first time point out without a pointer</p>
    </FirstTimePointOut>
  </section>
);
      `}
    </Highlight>
  </div>
);

export default Demo;

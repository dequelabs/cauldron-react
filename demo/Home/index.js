import React from 'react';
import Highlight from '../Highlight';

const Home = () => (
  <div>
    <h1>{'Cauldron React'}</h1>
    <h2>{'Installation'}</h2>
    <Highlight language='shell'>{'$ npm install cauldron-react'}</Highlight>
    <h2>{'Usage'}</h2>
    <Highlight language='javascript'>
      {`
import { Workspace, Button } from 'cauldron-react';

const Foo = () => (
  <Workspace>
    <h1>Hello world</h1>
    <Button>Cauldron is awesome!</Button>
  </Workspace>
);
      `}
    </Highlight>
  </div>
);

export default Home;

import React from 'react';
import Highlight from '../../../Highlight';

const Demo = () => (
  <div>
    <h1>Layout</h1>
    <p>
      The Layout component should wrap all content with the exceptions of the{' '}
      <code>TopBar</code> and the <code>SideBar</code> (see code sample below).
    </p>
    <h2>Code Sample</h2>
    <Highlight language="javascript">
      {`
import React from 'react';
import {
  Layout, Workspace, TopBar, SideBar
} from 'cauldron-react';

const App = () => (
  <div>
    <TopBar />
    <SideBar />
    <Layout>
      <Workspace>
        <h1>Hello world!</h1>
      </Workspace>
      <footer>footer stuff.</footer>
    </Layout>
  </div>
);
      `}
    </Highlight>
  </div>
);

export default Demo;

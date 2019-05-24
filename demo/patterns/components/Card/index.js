import React from 'react';
import Highlight from '../../../Highlight';
import { Card, CardHeader, CardContent, CardFooter } from '../../../../src';
import './index.css';

const Demo = () => (
  <div className="Card">
    <h1>Card</h1>
    <h2>Demo</h2>
    <Card>
      <CardHeader>
        <h3>Card heading</h3>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
      </CardContent>
      <CardFooter>Footer content</CardFooter>
    </Card>
    <h2>Code Sample</h2>
    <Highlight language="javascript">
      {`
import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from 'cauldron-react';

const Demo = () => (
  <Card>
    <CardHeader>
      <h3>Card heading</h3>
    </CardHeader>
    <CardContent>
      <p>Card content</p>
    </CardContent>
    <CardFooter>
      Footer content
    </CardFooter>
  </Card>
);
      `}
    </Highlight>
  </div>
);

export default Demo;

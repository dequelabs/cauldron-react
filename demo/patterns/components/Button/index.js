import React from 'react';
import Demo from 'demo/Demo';
import { Button } from 'src/';
import { children, className } from 'demo/props';

const ButtonDemo = () => (
  <Demo
    states={[
      { children: 'Primary' },
      { children: 'Secondary', secondary: true },
      { children: 'Disabled', secondary: true, disabled: true }
    ]}
    component={Button}
    propDocs={{
      secondary: {
        type: 'boolean',
        description: 'If the button is secondary'
      },
      buttonRef: {
        type: 'function',
        description: 'Ref function for the button element'
      },
      children,
      className
    }}
  />
);

export default ButtonDemo;

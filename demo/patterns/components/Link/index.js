import React, { Component } from 'react';
import Demo from 'demo/Demo';
import { Link, Code } from 'src/';
import { children, className } from 'demo/props';

export default class LinkDemo extends Component {
  render() {
    return (
      <div>
        <Demo
          component={Link}
          states={[
            {
              children: 'I am a link!',
              href: '#'
            }
          ]}
          propDocs={{
            children,
            className,
            linkRef: {
              type: 'function',
              description: (
                <div>
                  <p>
                    Ref function. <em>Example:</em>
                  </p>
                  <Code>{'element => this.link = element'}</Code>
                </div>
              )
            }
          }}
        />
      </div>
    );
  }
}
LinkDemo.displayName = 'LinkDemo';

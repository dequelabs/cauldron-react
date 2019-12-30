import React, { Component } from 'react';
import Demo from 'demo/Demo';
import { Link } from 'src/';
import { children, className } from 'demo/props';
import Highlight from 'demo/Highlight';

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
                  <Highlight>{'element => this.link = element'}</Highlight>
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

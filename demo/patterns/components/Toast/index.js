import React, { Component } from 'react';
import Highlight from 'demo/Highlight';
import { Button, Toast, Link } from 'src/';

export default class Demo extends Component {
  constructor() {
    super();

    this.state = {};
    this.onToastDismiss = this.onToastDismiss.bind(this);
  }

  onTriggerClick(type) {
    this.setState({ type });
  }

  onToastDismiss() {
    const { type } = this.state;
    const trigger = this[type];

    // return focus back to the dismissed toast's trigger
    if (trigger) {
      trigger.focus();
    }

    this.setState({ type: null });
  }

  render() {
    const { type } = this.state;

    return (
      <div>
        <Toast
          type={'confirmation'}
          onDismiss={this.onToastDismiss}
          show={type === 'confirmation'}
        >
          {'Everything is good!'}
        </Toast>
        <Toast
          type={'caution'}
          onDismiss={this.onToastDismiss}
          show={type === 'caution'}
        >
          {'Your software is out of date, please update it.'}
        </Toast>
        <Toast type={'action-needed'} show={type === 'action-needed'}>
          <span>{'You have entered an alternate universe.'}</span>
          <Link href="#" onClick={this.onToastDismiss}>
            {'Go back to non-alternate universe!'}
          </Link>
        </Toast>
        <h1>Toasts</h1>
        <h2>Demo</h2>
        <Button
          secondary={true}
          onClick={() => this.onTriggerClick('confirmation')}
          buttonRef={el => (this.confirmation = el)}
        >
          {'Confirmation'}
        </Button>
        <Button
          secondary={true}
          onClick={() => this.onTriggerClick('caution')}
          buttonRef={el => (this.caution = el)}
        >
          {'Caution'}
        </Button>
        <Button
          secondary={true}
          onClick={() => this.onTriggerClick('action-needed')}
          buttonRef={el => (this['action-needed'] = el)}
        >
          {'Action Needed'}
        </Button>
        <h2>Code Sample</h2>
        <Highlight language="javascript">
          {`
    import React from 'react';
    import { Toast } from 'cauldron-react';

    // a toast that hides itself after 7 seconds...
    const Demo = () => (
      <Toast
        type={'confirmation'}
        autoHide={7000}
        dismissText={'Close'}
        onClose={() => console.log('toast dismissed!')}
      >
        {'Everything is good!'}
      </Toast>
    );
          `}
        </Highlight>
      </div>
    );
  }
}

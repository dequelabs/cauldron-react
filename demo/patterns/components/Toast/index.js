import React, { Component } from 'react';
import { Button, Toast, Link } from 'src/';
import DemoComponent from 'demo/Demo';
import { children } from 'demo/props';

export default class Demo extends Component {
  state = {
    type: null
  };

  onTriggerClick(type) {
    this.setState({ type });
  }

  onToastDismiss = dismissed => {
    const { type } = this.state;

    if (dismissed !== type) {
      return;
    }

    this.setState({ type: null }, () => {
      const trigger = this[type];

      if (!trigger) {
        return;
      }

      // return focus back to the dismissed toast's trigger
      trigger.focus();
    });
  };

  render() {
    const { type } = this.state;

    return (
      <DemoComponent
        component={Toast}
        states={[
          {
            type: 'confirmation',
            children: 'Your toast is ready!',
            show: type === 'confirmation',
            autoHide: 5000,
            onDismiss: () => this.onToastDismiss('confirmation'),
            renderAfter: (
              <Button
                onClick={() => this.onTriggerClick('confirmation')}
                buttonRef={el => (this.confirmation = el)}
              >
                Confirmation
              </Button>
            )
          },
          {
            type: 'caution',
            children: 'The toast is getting toasty...',
            onDismiss: () => this.onToastDismiss('caution'),
            show: type === 'caution',
            renderAfter: (
              <Button
                variant="secondary"
                onClick={() => this.onTriggerClick('caution')}
                buttonRef={el => (this.caution = el)}
              >
                Caution
              </Button>
            )
          },
          {
            type: 'action-needed',
            children:
              'You burnt the toast! Check yourself before you wreck yourself...',
            show: false,
            renderAfter: (
              <Button
                variant="error"
                onClick={() => this.onTriggerClick('action-needed')}
                buttonRef={el => (this['action-needed'] = el)}
              >
                Action Needed
              </Button>
            )
          }
        ]}
        propDocs={{
          children,
          show: {
            type: 'boolean',
            description: 'whether or not to show the toast'
          },
          type: {
            type: 'string',
            required: true,
            description: '"confirmation", "caution", or "action-needed"'
          },
          onDismiss: {
            type: 'function',
            description: 'function to be executed when toast is dismissed'
          },
          autoHide: {
            type: 'number',
            description:
              'optional timeout (ms) before automatically hiding the toast'
          },
          dismissText: {
            type: 'string',
            description:
              'text to be added as the aria-label of the "x" dismiss button (default: "Dismiss")'
          },
          toastRef: {
            type: 'function',
            description:
              'optional ref function to get a handle on the toast element'
          }
        }}
      >
        <Toast type={'action-needed'} show={type === 'action-needed'}>
          <span>{'You have entered an alternate universe.'}</span>
          <Link href="#" onClick={() => this.onToastDismiss('action-needed')}>
            Go back to non-alternate universe!
          </Link>
        </Toast>
      </DemoComponent>
    );
  }
}

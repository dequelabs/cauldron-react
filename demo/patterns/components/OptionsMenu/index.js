import React, { Component } from 'react';
import Highlight from '../../../Highlight';
import {
  OptionsMenu,
  OptionsMenuItem,
  OptionsMenuWrapper,
  OptionsMenuTrigger,
  Icon
} from 'src/';

export default class Demo extends Component {
  constructor() {
    super();

    this.state = { show: false };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  render() {
    const { show } = this.state;

    return (
      <div>
        <h1>Options Menu</h1>
        <h2>Demo</h2>
        <OptionsMenuWrapper className='dqpl-align-left'>
          <OptionsMenuTrigger
            onClick={this.toggleMenu}
            triggerRef={el => this.trigger = el}
            aria-controls='options-menu-demo'
          >
            <Icon type='fa-ellipsis-v' label='Options' />
          </OptionsMenuTrigger>
          <OptionsMenu
            id='options-menu-demo'
            onClose={this.onClose}
            show={show}
          >
            <OptionsMenuItem>This</OptionsMenuItem>
            <OptionsMenuItem>That</OptionsMenuItem>
            <OptionsMenuItem>The third</OptionsMenuItem>
          </OptionsMenu>
        </OptionsMenuWrapper>
        <h2>Code Sample</h2>
        <Highlight language='javascript'>
          {`
import React, { Component } from 'react';
import {
  OptionsMenu,
  OptionsMenuItem,
  OptionsMenuWrapper,
  OptionsMenuTrigger,
  Icon
} from 'cauldron-react';

class Demo extends Component {
  constructor() {
    super();

    this.state = { show: false };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  render() {
    const { show } = this.state;

    return (
      <div>
        <h1>Options Menu</h1>
        <h2>Demo</h2>
        <OptionsMenuWrapper className='dqpl-align-left'>
          <OptionsMenuTrigger
            onClick={this.toggleMenu}
            triggerRef={el => this.trigger = el}
            aria-controls='options-menu-demo'
          >
            <Icon type='fa-ellipsis-v' label='Options' />
          </OptionsMenuTrigger>
          <OptionsMenu
            id='options-menu-demo'
            onClose={this.onClose}
            show={show}
          >
            <OptionsMenuItem>This</OptionsMenuItem>
            <OptionsMenuItem>That</OptionsMenuItem>
            <OptionsMenuItem>The third</OptionsMenuItem>
          </OptionsMenu>
        </OptionsMenuWrapper>
      </div>
    );
  }

  toggleMenu() {
    this.setState(({ show }) => ({
      show: !show
    }));
  }

  onClose() {
    this.toggleMenu();
    this.trigger.focus();
  }
}

          `}
        </Highlight>
      </div>
    );
  }

  toggleMenu() {
    this.setState(({ show }) => ({
      show: !show
    }));
  }

  onClose() {
    this.toggleMenu();
    this.trigger.focus();
  }
}

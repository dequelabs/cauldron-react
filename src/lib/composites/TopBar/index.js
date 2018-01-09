import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import store from '../../../store';
import MenuItem from '../../commons/MenuItem';
import Icon from '../../commons/Icon';
import { triggerToggle, sideBarTriggerIdentify } from '../../../actions/menu';

export default function TopBar(props) {
  return (
    <div className='dqpl-top-bar'>
      <ul role='menubar'>{props.children}</ul>
    </div>
  );
}

TopBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired
};

export function Item(props) {
  return (<MenuItem orientation={'horizontal'} stateKey={'topBar'} {...props} />);
}

export class Trigger extends Component {
  constructor() {
    super();

    this.state = {
      menuOpen: store.getState().menu.isOpen || false
    };

    // let the redux store know that we have a hamburger
    sideBarTriggerIdentify();

    this.onKeyUp = this.onKeyUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    store.subscribe(this.handleChange);
  }

  render() {
    const { menuOpen } = this.state;

    return (
      <MenuItem
        className={classNames('dqpl-menu-trigger', { 'dqpl-active': menuOpen })}
        stateKey={'topBar'}
        aria-haspopup='true'
        onClick={() => triggerToggle()}
        onKeyUp={this.onKeyUp}
        menuItemRef={el => this.element = el}
        {...this.props}
      >
        <Icon type={'fa-bars'} />
      </MenuItem>
    );
  }

  onKeyUp(e) {
    const { which } = e;
    if (which === 13 || which === 32 || which === 40) {
      triggerToggle();
    }
  }

  handleChange() {
    const { menuOpen } = this.state;
    const storeState = store.getState();
    const isOpen = storeState.menu.isOpen;
    const isWide = storeState.viewport.wide;

    if ((menuOpen !== isOpen) && !isWide) { // menu toggle
      this.setState({ menuOpen: isOpen });

      if (!isOpen && this.element) { this.element.focus(); }
    }
  }
}

// export { TopBar as default, Item, Trigger };

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import keyname from 'keyname';
import clickLink from './click-link';

export default class MenuItem extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    menuItemRef: PropTypes.func,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func
  }

  static defaultProps = {
    menuItemRef: () => {},
    onClick: () => {},
    onKeyDown: () => {}
  }

  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onClick(e) {
    clickLink(e.target, this.item);
    this.props.onClick();
  }

  onKeyDown(e) {
    const key = keyname(e.which);

    if (key === 'enter' || key === 'space') {
      e.preventDefault();
      this.item.click();
    }

    this.props.onKeyDown(e);
  }

  render() {
    const { children, menuItemRef, ...other } = this.props;
    return (
      <li
        {...other}
        role='menuitem'
        ref={item => {
          this.item = item;
          menuItemRef(item);
        }}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
      >
        {children}
      </li>
    );
  }
}

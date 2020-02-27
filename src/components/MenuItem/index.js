import React, { Component } from 'react';
import PropTypes from 'prop-types';
import keyname from 'keyname';
import clickLink from './click-link';

export default class MenuItem extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    menuItemRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.any })
    ]),
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    autoClickLink: PropTypes.bool
  };

  static defaultProps = {
    menuItemRef: () => {},
    onClick: () => {},
    onKeyDown: () => {},
    autoClickLink: true
  };

  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onClick(e) {
    const { autoClickLink, onClick } = this.props;
    if (autoClickLink) {
      clickLink(e.target, this.item);
    }
    onClick(e);
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
    // eslint-disable-next-line no-unused-vars
    const { children, menuItemRef, autoClickLink, ...other } = this.props;
    return (
      <li
        {...other}
        role="menuitem"
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

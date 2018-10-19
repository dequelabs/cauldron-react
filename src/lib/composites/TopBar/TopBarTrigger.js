import React, { Component } from 'react';
import PropTypes from 'prop-types';
import keyname from 'keyname';
import MenuItem from '../../commons/MenuItem';
import Icon from '../../commons/Icon';

const noop = () => {};

export default class TopBarTrigger extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func
  };

  static defaultProps = {
    onClick: noop,
    onKeyDown: noop
  };

  constructor() {
    super();
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(e) {
    const key = keyname(e.which);

    if (!['enter', 'space'].includes(key)) {
      return;
    }

    e.preventDefault();
    this.props.onClick(e);
    this.props.onKeyDown(e);
  }

  render() {
    return (
      <MenuItem
        className="dqpl-menu-trigger"
        aria-label="Menu"
        aria-haspopup="true"
        onKeyDown={this.onKeyDown}
        {...this.props}
      >
        <Icon type="fa-bars" />
      </MenuItem>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Trigger extends Component {
  static propTypes = {
    onKeyDown: PropTypes.func,
    onClick: PropTypes.func,
    triggerRef: PropTypes.func,
    className: PropTypes.string
  }

  static defaultProps = {
    onKeyDown: () => {},
    onClick: () => {},
    triggerRef: () => {}
  }

  constructor() {
    super();
    this.state = { expanded: false };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  render() {
    const { expanded } = this.state;
    const { triggerRef, className, ...other } = this.props;

    return (
      <button
        type='button'
        {...other}
        aria-expanded={expanded}
        className={classNames('dqpl-options-menu-trigger', className)}
        ref={triggerRef}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
      />
    );
  }

  onClick() {
    this.props.onClick();
    this.setState(({ expanded }) => ({
      expanded: !expanded
    }));
  }

  onKeyDown(e) {
    this.props.onKeyDown(e);

    if (e.which === 40) {
      e.preventDefault();
      e.target.click();
    }
  }
}

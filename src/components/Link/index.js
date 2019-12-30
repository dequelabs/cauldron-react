import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Link extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    linkRef: PropTypes.func
  };

  render() {
    const { children, linkRef, className, ...other } = this.props;
    return (
      <a
        ref={linkRef}
        className={classNames('dqpl-link', className)}
        {...other}
      >
        {children}
      </a>
    );
  }
}

Link.displayName = 'Link';

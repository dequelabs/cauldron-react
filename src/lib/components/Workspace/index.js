import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Workspace extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string
    ]).isRequired,
    workspaceRef: PropTypes.func
  };

  static defaultProps = {
    workspaceRef: () => {}
  };

  render() {
    const { children, workspaceRef, ...other } = this.props;

    return (
      <div
        className="dqpl-main-content"
        role="main"
        ref={workspaceRef}
        {...other}
      >
        {children}
      </div>
    );
  }
}

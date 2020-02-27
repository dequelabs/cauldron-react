import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Main extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    mainRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.any })
    ])
  };

  static defaultProps = {
    mainRef: () => {}
  };

  render() {
    const { mainRef, children, ...other } = this.props;
    return (
      <div className="dqpl-main-content" role="main" ref={mainRef} {...other}>
        {children}
      </div>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    layoutRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.any })
    ])
  };

  static defaultProps = {
    layoutRef: () => {}
  };

  render() {
    const { layoutRef, children, ...other } = this.props;
    return (
      <div className="dqpl-layout" ref={layoutRef} {...other}>
        {children}
      </div>
    );
  }
}

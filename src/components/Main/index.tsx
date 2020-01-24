import React, { Component } from 'react';
import PropTypes from 'prop-types';

export interface MainProps extends React.HTMLAttributes<HTMLDivElement> {
  mainRef?: Ref<HTMLDivElement>;
}

export default class Main extends Component<MainProps> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    mainRef: PropTypes.func
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

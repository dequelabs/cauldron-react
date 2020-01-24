import React, { Component } from 'react';

export interface MainProps extends React.HTMLAttributes<HTMLDivElement> {
  mainRef?: Ref<HTMLDivElement>;
}

export default class Main extends Component<MainProps> {
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

import React from 'react';

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  layoutRef?: Ref<HTMLDivElement>;
}

export default class Layout extends React.Component<LayoutProps> {
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

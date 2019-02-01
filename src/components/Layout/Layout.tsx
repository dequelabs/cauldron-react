import * as React from 'react';
import * as PropTypes from 'prop-types';
import { RefCallback } from '../../types';

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  layoutRef?: RefCallback;
}

class Layout extends React.Component<LayoutProps> {
  public static displayName = 'Layout';

  public static propTypes = {
    children: PropTypes.node.isRequired,
    layoutRef: PropTypes.func
  };

  public render() {
    const { layoutRef, children, ...other } = this.props;
    return (
      <div className="dqpl-layout" ref={layoutRef} {...other}>
        {children}
      </div>
    );
  }
}

export default Layout;

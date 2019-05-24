import * as React from 'react';
import * as PropTypes from 'prop-types';

const noop = () => {};

interface LayoutProps {
  children: React.ReactNode;
  layoutRef?: (ref: HTMLDivElement) => void;
}

export default class Layout extends React.Component<LayoutProps> {
  public static displayName = 'Layout';

  public static propTypes = {
    children: PropTypes.node.isRequired,
    layoutRef: PropTypes.func
  };

  public static defaultProps = {
    layoutRef: noop
  };

  public render() {
    const { layoutRef = noop, children, ...other } = this.props;
    return (
      <div className="dqpl-layout" ref={layoutRef} {...other}>
        {children}
      </div>
    );
  }
}

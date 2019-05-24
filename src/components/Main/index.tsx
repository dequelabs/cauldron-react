import * as React from 'react';
import * as PropTypes from 'prop-types';

interface MainProps {
  children: React.ReactNode;
  mainRef?: (ref: HTMLDivElement) => void;
}

export default class Main extends React.Component<MainProps> {
  public static displayName = 'Main';

  public static propTypes = {
    children: PropTypes.node.isRequired,
    mainRef: PropTypes.func
  };

  public static defaultProps = {
    mainRef: () => {}
  };

  public render() {
    const { mainRef, children, ...other } = this.props;
    return (
      <div className="dqpl-main-content" role="main" ref={mainRef} {...other}>
        {children}
      </div>
    );
  }
}

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { RefCallback } from '../../types';

interface MainProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  mainRef?: RefCallback;
}

class Main extends React.Component<MainProps> {
  public static displayName = 'Main';

  public static propTypes = {
    children: PropTypes.node.isRequired,
    mainRef: PropTypes.func
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

export default Main;

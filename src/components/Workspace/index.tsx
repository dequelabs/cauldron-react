import React from 'react';
import Main from '../Main';
import Layout from '../Layout';

export interface WorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  workspaceRef: RefCallback<HTMLDivElement>;
  layoutRef: RefCallback<HTMLDivElement>;
  noSideBar: boolean;
}

export default class Workspace extends React.Component<WorkspaceProps> {
  static defaultProps = {
    workspaceRef: () => {},
    layoutRef: () => {},
    noSideBar: false
  };

  componentDidMount() {
    document.body.classList.toggle('dqpl-no-sidebar', this.props.noSideBar);
  }

  componentDidUpdate(prevProps: WorkspaceProps) {
    if (prevProps.noSideBar === this.props.noSideBar) {
      return;
    }

    document.body.classList.toggle('dqpl-no-sidebar', this.props.noSideBar);
  }

  componentWillUnmount() {
    document.body.classList.remove('dqpl-no-sidebar');
  }

  render() {
    const {
      // defining `noSideBar` to prevent it from being passed through to Main
      // eslint-disable-next-line no-unused-vars
      noSideBar,
      children,
      workspaceRef,
      layoutRef,
      ...other
    } = this.props;

    return (
      <Layout layoutRef={layoutRef}>
        <Main mainRef={workspaceRef} {...other}>
          {children}
        </Main>
      </Layout>
    );
  }
}

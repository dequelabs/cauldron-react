import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Main from '../Main';
import Layout from '../Layout';

export default class Workspace extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string
    ]).isRequired,
    workspaceRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.any })
    ]),
    layoutRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.any })
    ]),
    noSideBar: PropTypes.bool
  };

  static defaultProps = {
    workspaceRef: () => {},
    layoutRef: () => {},
    noSideBar: false
  };

  componentDidMount() {
    document.body.classList.toggle('dqpl-no-sidebar', this.props.noSideBar);
  }

  componentDidUpdate(prevProps) {
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

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
    workspaceRef: PropTypes.func,
    layoutRef: PropTypes.func
  };

  static defaultProps = {
    workspaceRef: () => {},
    layoutRef: () => {}
  };

  render() {
    const { children, workspaceRef, layoutRef, ...other } = this.props;

    return (
      <Layout layoutRef={layoutRef}>
        <Main mainRef={workspaceRef} {...other}>
          {children}
        </Main>
      </Layout>
    );
  }
}

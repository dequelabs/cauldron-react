import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import store from '../../../store';
import MenuItem from '../../commons/MenuItem';
import Scrim from '../../commons/Scrim';
import { onResize, isWide } from '../../../actions/viewport';

export const Item = (props) => (
  <MenuItem
    orientation={'vertical'}
    stateKey={'sideBar'}
    {...props}
  />
);

export default class SideBar extends Component {
  constructor() {
    super();

    // initial state
    this.state = {
      expanded: false,
      wide: isWide()
    };

    // events
    this.handleChange = this.handleChange.bind(this);
    store.subscribe(this.handleChange);
  }

  componentWillMount() {
    onResize();
    window.addEventListener('resize', onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', onResize);
  }

  handleChange() {
    const { wide, expanded } = this.state;
    const storeState = store.getState();
    const isOpen = storeState.menu.isOpen;

    if (storeState.viewport.isWide !== wide) {
      this.setState({ wide: storeState.viewport.isWide });
    } else if (typeof isOpen !== 'undefined' && isOpen !== expanded) {
      this.setState(prevState => ({ expanded: !prevState.expanded }));
    }
  }

  render() {
    const { expanded, wide } = this.state;
    const expandedProp = wide ? {} : { 'aria-expanded': `${expanded}` };

    return ([
      <ul
        className={classNames('dqpl-side-bar', {
          'dqpl-show dqpl-active': expanded
        })}
        role='menu'
        {...expandedProp}
        key={1}
      >
        {this.props.children}
      </ul>,
      <Scrim show={wide ? false : expanded} key={2} />
    ]);
  }
}

SideBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired
};

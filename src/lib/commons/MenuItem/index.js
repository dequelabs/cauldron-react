import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from '../../../store';
import clickLink from './click-link';
import {
  onMenuKeydown,
  menuItemIdentify,
  triggerToggle,
  unsuppressTopBarFocus
} from '../../../actions/menu';

const actionPrefixMap = {
  sideBar: 'SIDE_BAR',
  topBar: 'TOP_BAR'
};

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
    const { stateKey } = props;
    const menuState = this.getMenuState();

    this.state = {
      focusIndex: menuState.focusIndex || 0,
      menuOpen: false,
      isWide: store.getState().viewport.isWide
    };

    this.isSideBar = stateKey === 'sideBar';
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    // identify self to be used in keydown logic
    menuItemIdentify(`${actionPrefixMap[stateKey]}_ITEM_IDENTIFY`, props.index);

    // listen for redux state changes
    store.subscribe(this.handleChange);
  }

  // returns the proper (sideBar or topBar) menu state from the redux store
  getMenuState() {
    const { stateKey } = this.props;

    return store.getState().menu[stateKey] || {};
  }

  handleChange() {
    const { index } = this.props;
    const { focusIndex, menuOpen } = this.state; // current focus index
    const newMenuState = this.getMenuState();
    const newFocusIndex = newMenuState.focusIndex;
    const indexChange = newFocusIndex !== focusIndex;
    const storeState = store.getState();
    const isOpen = storeState.menu.isOpen;
    const isWide = storeState.viewport.isWide;
    const suppress = storeState.menu.topBar.suppressFocus;
    const openChange = isOpen !== menuOpen;

    if (indexChange) { // keydown has occured
      this.setState({ focusIndex: newFocusIndex });

      if (newFocusIndex === index && !suppress) {
        this.element.focus();
      } else if (suppress) {
        setTimeout(unsuppressTopBarFocus);
      }
    } else if (openChange) {
      // TODO fix this up to find the previously active menu item (like how it works in dqpl)
      const shouldFocus = this.isSideBar && isOpen && !menuOpen && index === 0;

      this.setState({ menuOpen: isOpen }, () => {
        if (shouldFocus && this.element) {
          this.element.focus();
        }
      });
    }

    // map relevant store state to local state
    this.setState({ isWide });
  }

  onKeyDown(e) {
    const { which, target } = e;
    const { orientation, stateKey } = this.props;

    if (this.isSideBar && which === 27 && !store.getState().viewport.isWide) {
      return triggerToggle();
    } else if (target.tagName !== 'A' && (which === 13 || which === 32)) {
      return clickLink(target, this.isSideBar);
    }

    // dispatches action to update focus index
    onMenuKeydown(orientation, `${actionPrefixMap[stateKey]}_FOCUS_INDEX`, which);
  }

  onClick(e) {
    const { target } = e;

    if (target.tagName !== 'A') {
      clickLink(target, this.isSideBar);
    }
  }

  render() {
    const focusIndex = this.state.focusIndex || 0;
    // NOTE: defining some specific unused props here
    // so they don't get passed through as DOM attributes
    // eslint-disable-next-line no-unused-vars
    const { index, menuItemRef, stateKey, orientation, ...others } = this.props;

    return (
      <li
        role='menuitem'
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        tabIndex={index === focusIndex ? 0 : -1}
        ref={el => {
          this.element = el;
          menuItemRef(el);
        }}
        {...others}
      />
    );
  }
}

MenuItem.defaultProps = {
  orientation: 'horizontal',
  menuItemRef: () => {}
};

MenuItem.propTypes = {
  index: PropTypes.number.isRequired,
  orientation: PropTypes.string,
  menuItemRef: PropTypes.func,
  stateKey: PropTypes.string.isRequired
};

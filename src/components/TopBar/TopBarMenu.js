import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '../MenuItem';
import OptionsMenu from '../OptionsMenu';
import classnames from 'classnames';
import keyname from 'keyname';

export default class TopBarMenu extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    onKeyDown: () => {}
  };

  state = {
    open: false
  };

  handleClick = e => {
    const { optionsMenuRef, state } = this;
    const { open } = state;

    if (optionsMenuRef && !optionsMenuRef.contains(e.target)) {
      this.setState({ open: !open });
      e.preventDefault();
    }
  };

  handleClose = () => {
    this.setState({ open: false });
    this.menuItemRef.focus();
  };

  handleKeyDown = e => {
    const key = keyname(e.which);
    const { handleClose, state, props } = this;
    const { open } = state;
    const { onKeyDown } = props;

    if ((key === 'left' || key === 'right') && open) {
      handleClose();
    } else if (key === 'down' && !open) {
      this.setState({ open: true });
      this.optionsMenuRef.focus();
    }

    onKeyDown(e);
  };

  render() {
    const { props, state, handleClick, handleClose, handleKeyDown } = this;
    const { children, id, ...other } = props;
    const { open } = state;

    const optionsMenu = React.Children.toArray(children).find(
      child => child.type === OptionsMenu
    );
    const otherChildren = React.Children.toArray(children).filter(
      child => typeof child === 'string' || child.type !== OptionsMenu
    );

    return (
      <MenuItem
        {...other}
        menuItemRef={el => {
          this.menuItemRef = el;
          if (props.menuItemRef) {
            props.menuItemRef(el);
          }
        }}
        aria-controls={id}
        aria-expanded={open}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {otherChildren}
        {React.cloneElement(optionsMenu, {
          id,
          className: classnames('dqpl-dropdown', {
            'dqpl-dropdown-active': open
          }),
          menuRef: el => (this.optionsMenuRef = el),
          show: open,
          onClose: handleClose
        })}
      </MenuItem>
    );
  }
}

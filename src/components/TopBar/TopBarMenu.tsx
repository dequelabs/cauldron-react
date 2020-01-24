import React from 'react';
import MenuItem from '../MenuItem';
import { OptionsMenuList } from '../OptionsMenu';
import classnames from 'classnames';
import keyname from 'keyname';

export interface TopBarMenuProps
  extends Pick<
    React.HTMLAttributes<HTMLLIElement>,
    Exclude<keyof React.HTMLAttributes<HTMLLIElement>, 'onKeyDown'>
  > {
  onKeyDown: (e: React.KeyboardEvent<HTMLLIElement>) => void;
}

interface TopBarMenuState {
  open: boolean;
}

export default class TopBarMenu extends React.Component<
  TopBarMenuProps,
  TopBarMenuState
> {
  static defaultProps = {
    onKeyDown: () => {}
  };

  state: TopBarMenuState = {
    open: false
  };

  private optionsMenuRef: React.Ref<HTMLUListElement>;
  private menuItemRef: React.Ref<HTMLLIElement>;

  private handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { optionsMenuRef, state } = this;
    const { open } = state;

    if (optionsMenuRef && !optionsMenuRef.contains(e.target as HTMLLIElement)) {
      this.setState({ open: !open });
      e.preventDefault();
    }
  };

  private handleClose = () => {
    this.setState({ open: false });
    this.menuItemRef?.focus();
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const key = keyname(e.which);
    const { handleClose, state, props } = this;
    const { open } = state;
    const { onKeyDown } = props;

    if ((key === 'left' || key === 'right') && open) {
      handleClose();
    } else if (key === 'down' && !open) {
      this.setState({ open: true });
      this.optionsMenuRef?.focus();
    }

    onKeyDown(e);
  };

  render() {
    const { props, state, handleClick, handleClose, handleKeyDown } = this;
    const { children, id, ...other } = props;
    const { open } = state;

    const menu = React.Children.toArray(children).find(
      child => child?.type === OptionsMenuList
    );
    const otherChildren = React.Children.toArray(children).filter(
      child => typeof child === 'string' || child.type !== OptionsMenuList
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
        {React.cloneElement(menu, {
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

import * as React from 'react';
import * as PropTypes from 'prop-types';
import keyname = require('keyname');
import clickLink from './click-link';

const noop = () => {};

interface MenuItemProps {
  children: React.ReactNode;
  menuItemRef?: (ref: HTMLLIElement | null) => void;
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLLIElement>) => void;
  autoClickLink?: boolean;
}

export default class MenuItem extends React.Component<MenuItemProps> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
    menuItemRef: PropTypes.func,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    autoClickLink: PropTypes.bool
  };

  public static defaultProps = {
    menuItemRef: noop,
    onClick: noop,
    onKeyDown: noop,
    autoClickLink: true
  };

  private item: HTMLLIElement | null = null;

  private onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { autoClickLink, onClick } = this.props;
    if (autoClickLink) {
      clickLink(e.target as HTMLElement, this.item as HTMLElement);
    }
    if (onClick) {
      onClick(e);
    }
  };

  private onKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    const key = keyname(e.which);

    if (key === 'enter' || key === 'space') {
      e.preventDefault();
      if (this.item) {
        this.item.click();
      }
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  };

  public render() {
    // eslint-disable-next-line no-unused-vars
    const {
      children,
      menuItemRef = noop,
      autoClickLink,
      ...other
    } = this.props;
    return (
      <li
        {...other}
        role="menuitem"
        ref={item => {
          this.item = item;
          menuItemRef(item);
        }}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
      >
        {children}
      </li>
    );
  }
}

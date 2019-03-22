import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as keyname from 'keyname';
import { RefCallback } from '../../types';
import clickLink from './clickLink';

interface Props extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  menuItemRef?: RefCallback;
  onClick?: () => void;
  onKeydown?: (e: React.KeyboardEvent<HTMLLIElement>) => void;
  autoClickLink?: boolean;
}

class MenuItem extends React.Component<Props> {
  public static displayName = 'MenuItem';

  public static propTypes = {
    children: PropTypes.node.isRequired,
    menuItemRef: PropTypes.func,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    autoClickLink: PropTypes.bool
  };

  private item: HTMLLIElement | null = null;

  public render() {
    const {
      children,
      menuItemRef,
      onClick,
      onKeyDown,
      autoClickLink = true,
      ...other
    } = this.props;
    return (
      <li
        {...other}
        role="menuitem"
        ref={this.setRef}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
      >
        {children}
      </li>
    );
  }

  private setRef(el: HTMLLIElement | null) {
    this.item = el;
    const { menuItemRef } = this.props;
    if (typeof menuItemRef === 'function') {
      menuItemRef(el);
    }
  }

  private handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { onClick, autoClickLink } = this.props;
    if (autoClickLink) {
      clickLink(e.target as HTMLLIElement, this.item);
    }

    if (typeof onClick === 'function') {
      onClick();
    }
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    const key = keyname(e.which);

    if (key === 'enter' || key === 'space') {
      e.preventDefault();
      if (this.item) {
        this.item.click();
      }
    }

    const { onKeyDown } = this.props;
    if (typeof onKeyDown === 'function') {
      onKeyDown(e);
    }
  };
}

export default MenuItem;

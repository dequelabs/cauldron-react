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
}

class MenuItem extends React.Component<Props> {
  public static displayName = 'MenuItem';

  public static propTypes = {
    children: PropTypes.node.isRequired,
    menuItemRef: PropTypes.func,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func
  };

  private item: HTMLLIElement | null = null;

  public render() {
    const { children, menuItemRef, onClick, onKeyDown, ...other } = this.props;
    return (
      <li
        {...other}
        role="menuitem"
        ref={this.setRef}
        onClick={this.handleClick}
        onKeydown={this.handleKeydown}
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
    clickLink(e.target, this.item);

    const { onClick } = this.props;
    if (typeof onClick === 'function') {
      onClick();
    }
  };

  private handleKeydown = (e: React.KeyboardEvent<HTMLLIElement>) => {
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

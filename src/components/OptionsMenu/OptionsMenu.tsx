import * as React from 'react';
import * as PropTypes from 'prop-types';
import ClickOutsideListener from '../ClickOutsideListener';

interface OptionsMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  id: string;
  onClose: () => void;
  onselect: () => void;
  show?: boolean;
  closeOnSelect?: boolean;
}

interface OptionsMenuState {
  itemIndex: number;
}

export default class OptionsMenu extends React.Component<
  OptionsMenuProps,
  OptionsMenuState
> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    show: PropTypes.bool,
    closeOnSelect: PropTypes.bool
  };

  public static defaultProps = {
    show: false,
    closeOnSelect: true,
    onSelect: () => {}
  };

  public readonly state: OptionsMenuState = { itemIndex: 0 };

  private itemRefs: Array<HTMLLIElement | null> = [];
  private menuRef: React.RefObject<HTMLUListElement>;

  public componentDidUpdate(
    prevProps: OptionsMenuProps,
    prevState: OptionsMenuState
  ) {
    const { itemIndex } = this.state;
    const { show } = this.props;

    if (!prevProps.show && show && this.itemRefs.length) {
      // handles opens
      const item = this.itemRefs[0];
      if (item) {
        item.focus();
      }
    } else if (prevState.itemIndex !== itemIndex) {
      // handle up/down arrows
      const item = this.itemRefs[itemIndex];
      if (item) {
        item.focus();
      }
    }
  }

  public render() {
    // eslint-disable-next-line no-unused-vars
    const { children, id, show, closeOnSelect, ...other } = this.props;
    const items = React.Children.map(children as any, ({ props }, i) => (
      <li
        key={`${id}-${i}`}
        className="dqpl-options-menuitem"
        tabIndex={-1}
        role="menuitem"
        ref={el => (this.itemRefs[i] = el)}
        {...props}
      />
    ));

    return (
      <ClickOutsideListener onClickOutside={this.handleClickOutside}>
        <ul
          {...other}
          className="dqpl-options-menu"
          aria-expanded={show}
          id={id}
          role="menu"
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          ref={this.menuRef}
        >
          {items}
        </ul>
      </ClickOutsideListener>
    );
  }

  private handleClick(e: React.MouseEvent<HTMLUListElement>) {
    const { menuRef, props } = this;
    const { onSelect, onClose } = props;
    const target = e.target as HTMLElement;
    if (menuRef.current && menuRef.current.contains(target)) {
      if (!e.defaultPrevented && props.closeOnSelect) {
        onClose();
      }

      if (onSelect) {
        onSelect(e);
      }
    }

    const link = target.querySelector('a');
    if (link) {
      link.click();
    }
  }

  private handleClickOutside() {
    const { show, onClose } = this.props;
    if (show) {
      onClose();
    }
  }

  private handleKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    const { which, target } = e;
    switch (which) {
      // up / down
      case 38:
      case 40: {
        const { itemIndex } = this.state;
        const itemCount = this.itemRefs.length;
        let newIndex = which === 38 ? itemIndex - 1 : itemIndex + 1;

        // circularity
        if (newIndex === -1) {
          newIndex = itemCount - 1;
        } else if (newIndex === itemCount) {
          newIndex = 0;
        }

        e.preventDefault();
        this.setState({
          itemIndex: newIndex
        });

        break;
      }
      // escape
      case 27:
        this.props.onClose();

        break;
      // enter / space
      case 13:
      case 32:
        e.preventDefault();
        (target as HTMLElement).click();

        break;
      // tab
      case 9:
        e.preventDefault();
        this.props.onClose();
    }
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import ClickOutsideListener from '../ClickOutsideListener';
import classnames from 'classnames';

const [up, down, tab, enter, space, esc] = [38, 40, 9, 13, 32, 27];

export default class OptionsMenuList extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    className: PropTypes.string,
    onSelect: PropTypes.func,
    closeOnSelect: PropTypes.bool,
    menuRef: PropTypes.func
  };

  static defaultProps = {
    closeOnSelect: true,
    onSelect: () => {}
  };

  constructor() {
    super();
    this.itemRefs = [];
    this.state = { itemIndex: 0 };
  }

  componentDidUpdate(prevProps, prevState) {
    const { itemIndex } = this.state;
    const { show } = this.props;

    if (!prevProps.show && show && this.itemRefs.length) {
      // handles opens
      this.itemRefs[0].focus();
      this.setState({ itemIndex: 0 });
    } else if (prevState.itemIndex !== itemIndex) {
      // handle up/down arrows
      this.itemRefs[itemIndex].focus();
    }
  }

  handleKeyDown = e => {
    const { onClose } = this.props;
    const { which, target } = e;
    switch (which) {
      case up:
      case down: {
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
      case esc:
        onClose();

        break;
      case enter:
      case space:
        e.preventDefault();
        target.click();

        break;
      case tab:
        e.preventDefault();
        onClose();
    }
  };

  handleClick = e => {
    const { menuRef, props } = this;
    const { onSelect, onClose } = props;
    if (menuRef && menuRef.contains(e.target)) {
      if (!e.defaultPrevented && props.closeOnSelect) {
        onClose();
      }

      onSelect(e);
    }

    const link = e.target.querySelector('a');
    if (link) {
      link.click();
    }
  };

  handleClickOutside = () => {
    const { onClose, show } = this.props;
    if (show) {
      onClose();
    }
  };

  render() {
    const { props, handleClick, handleKeyDown } = this;
    /* eslint-disable no-unused-vars */
    const {
      children,
      menuRef,
      show,
      className,
      onClose,
      onSelect,
      closeOnSelect,
      ...other
    } = props;
    /* eslint-enable no-unused-vars */

    const items = React.Children.toArray(children).map((child, i) => {
      const { className, ...other } = child.props;
      return React.cloneElement(child, {
        key: `list-item-${i}`,
        className: classnames('dqpl-options-menuitem', className),
        tabIndex: -1,
        role: 'menuitem',
        ref: el => (this.itemRefs[i] = el),
        ...other
      });
    });

    return (
      <ClickOutsideListener onClickOutside={this.handleClickOutside}>
        <ul
          {...other}
          className={('dqpl-options-menu', className)}
          /* aria-expanded is not correct usage here, but the pattern library
             currently styles the open state of the menu. based on this attribute */
          aria-expanded={show}
          role="menu"
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          ref={el => {
            this.menuRef = el;
            if (menuRef) {
              menuRef(el);
            }
          }}
        >
          {items}
        </ul>
      </ClickOutsideListener>
    );
  }
}

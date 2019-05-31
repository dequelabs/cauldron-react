import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickOutsideListener from '../ClickOutsideListener';
import classnames from 'classnames';

export default class OptionsMenu extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    className: PropTypes.string,
    onSelect: PropTypes.func,
    show: PropTypes.bool,
    closeOnSelect: PropTypes.bool,
    menuRef: PropTypes.func
  };

  static defaultProps = {
    show: false,
    closeOnSelect: true,
    className: 'dqpl-options-menu',
    onSelect: () => {}
  };

  constructor() {
    super();
    this.itemRefs = [];
    this.state = { itemIndex: 0 };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.menuRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const { itemIndex } = this.state;
    const { show } = this.props;

    if (!prevProps.show && show && this.itemRefs.length) {
      // handles opens
      this.itemRefs[0].focus();
    } else if (prevState.itemIndex !== itemIndex) {
      // handle up/down arrows
      this.itemRefs[itemIndex].focus();
    }
  }

  render() {
    /* eslint-disable no-unused-vars */
    const {
      children,
      className,
      show,
      closeOnSelect,
      menuRef,
      ...other
    } = this.props;
    /* eslint-enable no-unused-vars */
    const items = React.Children.map(children, ({ props }, i) => {
      const { className, ...other } = props;
      return (
        <li
          key={`list-item-${i}`}
          className={classnames('dqpl-options-menuitem', className)}
          tabIndex={-1}
          role="menuitem"
          ref={el => (this.itemRefs[i] = el)}
          {...other}
        />
      );
    });

    return (
      <ClickOutsideListener onClickOutside={this.handleClickOutside}>
        <ul
          {...other}
          className={className}
          aria-expanded={show}
          role="menu"
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
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

  handleClick(e) {
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
  }

  handleClickOutside() {
    const { show, onClose } = this.props;
    if (show) {
      onClose();
    }
  }

  handleKeyDown(e) {
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
        target.click();

        break;
      // tab
      case 9:
        e.preventDefault();
        this.props.onClose();
    }
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickOutsideListener from '../ClickOutsideListener';

export default class OptionsMenu extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    show: PropTypes.bool
  };

  static defaultProps = {
    show: false,
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
    const { children, id, show, ...other } = this.props;
    const items = children.map(({ props }, i) => (
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

  handleClick(e) {
    const { menuRef, props } = this;
    if (menuRef.current && menuRef.current.contains(e.target)) {
      props.onSelect(e);
    }
  }

  handleClickOutside() {
    const { show, props } = this;
    if (!show) {
      props.onClose();
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

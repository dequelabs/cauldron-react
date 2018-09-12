import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class OptionsMenu extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool
  };

  static defaultProps = {
    show: false
  };

  constructor() {
    super();
    this.itemRefs = [];
    this.state = { itemIndex: 0 };
    this.onKeyDown = this.onKeyDown.bind(this);
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
      <ul
        {...other}
        className="dqpl-options-menu"
        aria-expanded={show}
        id={id}
        role="menu"
        onKeyDown={this.onKeyDown}
      >
        {items}
      </ul>
    );
  }

  onKeyDown(e) {
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

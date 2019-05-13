import React from 'react';
import PropTypes from 'prop-types';

export default class ClickOutsideListener extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClickOutside: PropTypes.func.isRequired,
    mouseEvent: PropTypes.oneOf(['mousedown', 'click', 'mouseup', false]),
    touchEvent: PropTypes.oneOf(['touchstart', 'touchend', false])
  };

  static defaultProps = {
    mouseEvent: 'click',
    touchEvent: 'touchend'
  };

  handleEvent = event => {
    const { nodeRef, props } = this;
    const { onClickOutside } = props;

    if (event.defaultPrevented) {
      return;
    }

    if (nodeRef && !nodeRef.contains(event.target)) {
      onClickOutside(event);
    }
  };

  componentDidMount() {
    this.attachEventListeners();
  }

  componentDidUpdate(prevProps) {
    const { mouseEvent, touchEvent } = this;
    if (
      prevProps.mouseEvent !== mouseEvent ||
      prevProps.touchEvent !== touchEvent
    ) {
      this.removeEventListeners(prevProps.mouseEvent, prevProps.touchEvent);
      this.attachEventListeners();
    }
  }

  componentWillUnmount() {
    const { mouseEvent, touchEvent } = this.props;
    this.removeEventListeners(mouseEvent, touchEvent);
  }

  attachEventListeners = () => {
    const { mouseEvent, touchEvent } = this.props;
    typeof mouseEvent === 'string' &&
      document.addEventListener(mouseEvent, this.handleEvent);
    typeof touchEvent === 'string' &&
      document.addEventListener(touchEvent, this.handleEvent);
  };

  removeEventListeners = (mouseEvent, touchEvent) => {
    typeof mouseEvent === 'string' &&
      document.removeEventListener(mouseEvent, this.handleEvent);
    typeof touchEvent === 'string' &&
      document.removeEventListener(touchEvent, this.handleEvent);
  };

  resolveRef = node => {
    this.nodeRef = node;

    // If child has its own ref, we want to update
    // its ref with the newly cloned node
    let { ref } = this.props.children;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref !== null) {
      ref.current = node;
    }
  };

  render() {
    const { props, resolveRef } = this;
    return React.cloneElement(props.children, { ref: resolveRef });
  }
}

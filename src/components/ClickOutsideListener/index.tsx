import * as React from 'react';
import * as PropTypes from 'prop-types';

interface ClickOutsideListenerProps {
  children: React.ReactNode;
  onClickOutside: (event: Event) => void;
  mouseEvent?: 'mousedown' | 'click' | 'mouseup' | false;
  touchEvent?: 'touchstart' | 'touchend' | false;
}

export default class ClickOutsideListener extends React.Component<
  ClickOutsideListenerProps
> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
    onClickOutside: PropTypes.func.isRequired,
    mouseEvent: PropTypes.oneOf(['mousedown', 'click', 'mouseup', false]),
    touchEvent: PropTypes.oneOf(['touchstart', 'touchend', false])
  };

  public static defaultProps = {
    mouseEvent: 'click',
    touchEvent: 'touchend'
  };

  private nodeRef: HTMLElement | null = null;

  private handleEvent = (event: Event) => {
    const { nodeRef, props } = this;
    const { onClickOutside } = props;

    if (event.defaultPrevented) {
      return;
    }

    const target = event.target as HTMLElement;
    if (nodeRef && !nodeRef.contains(target)) {
      onClickOutside(event);
    }
  };

  public componentDidMount() {
    this.attachEventListeners();
  }

  public componentDidUpdate(prevProps: ClickOutsideListenerProps) {
    const { mouseEvent, touchEvent } = this.props;
    if (
      prevProps.mouseEvent !== mouseEvent ||
      prevProps.touchEvent !== touchEvent
    ) {
      this.removeEventListeners(prevProps.mouseEvent, prevProps.touchEvent);
      this.attachEventListeners();
    }
  }

  public componentWillUnmount() {
    const { mouseEvent = 'click', touchEvent = 'touchend' } = this.props;
    this.removeEventListeners(mouseEvent, touchEvent);
  }

  private attachEventListeners = () => {
    const { mouseEvent, touchEvent } = this.props;
    typeof mouseEvent === 'string' &&
      document.addEventListener(mouseEvent, this.handleEvent);
    typeof touchEvent === 'string' &&
      document.addEventListener(touchEvent, this.handleEvent);
  };

  private removeEventListeners = (
    mouseEvent?: string | boolean,
    touchEvent?: string | boolean
  ) => {
    typeof mouseEvent === 'string' &&
      document.removeEventListener(mouseEvent, this.handleEvent);
    typeof touchEvent === 'string' &&
      document.removeEventListener(touchEvent, this.handleEvent);
  };

  private resolveRef = (node: HTMLElement) => {
    this.nodeRef = node;

    // If child has its own ref, we want to update
    // its ref with the newly cloned node
    const { ref } = this.props.children as any;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref !== null) {
      ref.current = node;
    }
  };

  public render() {
    const { props, resolveRef } = this;
    return React.cloneElement(props.children as any, { ref: resolveRef });
  }
}

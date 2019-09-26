import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import focusable from 'focusable';
import rndid from '../../utils/rndid';
import removeIds from '../../utils/remove-ids';

const __Element = typeof Element === 'undefined' ? function() {} : Element;

export default class FirstTimePointOut extends Component {
  static propTypes = {
    heading: PropTypes.node,
    children: PropTypes.node.isRequired,
    ftpRef: PropTypes.func,
    noArrow: function(props, propName) {
      if (props[propName] === true && typeof props['target'] !== 'undefined') {
        return new Error(
          'A "target" prop with "noArrow=true" is not currently supported.'
        );
      }
    },
    arrowPosition: PropTypes.string,
    onClose: PropTypes.func,
    dismissText: PropTypes.string,
    className: PropTypes.string,
    target: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(__Element) })
    ]),
    portal: PropTypes.instanceOf(__Element)
  };

  static defaultProps = {
    ftpRef: () => {},
    noArrow: false,
    onClose: () => {},
    dismissText: 'dismiss',
    arrowPosition: 'top-left'
  };

  constructor(props) {
    super(props);
    this.state = { show: true, style: {} };
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  getFocusableElements(root) {
    return Array.from(root.querySelectorAll(focusable));
  }

  componentDidMount() {
    const { positionRelativeToTarget, attachOffscreenListeners } = this;

    positionRelativeToTarget();

    this.setState({ headingId: rndid() });

    // debounce resize event to rAF
    this.resizeDebounce = () => {
      if (this.resizeDebounceId) {
        cancelAnimationFrame(this.resizeDebounceId);
      }
      this.resizeDebounceId = requestAnimationFrame(() => {
        this.positionRelativeToTarget();
      });
    };
    window.addEventListener('resize', this.resizeDebounce);
    attachOffscreenListeners();

    // If the component mounts before fonts have finished loading, ensure that we
    // reposition the element when all fonts are ready
    if (document && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => this.positionRelativeToTarget());
    }
  }

  forceUpdate() {
    super.forceUpdate();
    requestAnimationFrame(() => this.positionRelativeToTarget());
  }

  componentWillUnmount() {
    const {
      resizeDebounce,
      offscreenRef,
      offscreenContentRef,
      handleOffscreenContentFocusIn,
      handleOffscreenContentFocusOut
    } = this;

    if (resizeDebounce) {
      window.removeEventListener('resize', resizeDebounce);
    }

    if (offscreenRef) {
      this.offscreenRef.removeEventListener('focusin', this.handleFocusIn);
      this.offscreenRef.removeEventListener('focusout', this.handleFocusOut);
    }

    if (offscreenContentRef) {
      offscreenContentRef.removeEventListener(
        'focusin',
        handleOffscreenContentFocusIn
      );
      offscreenContentRef.removeEventListener(
        'focusout',
        handleOffscreenContentFocusOut
      );
    }
  }

  // Mirror the offscreen focus to the visible content
  attachOffscreenListeners = () => {
    const { offscreenRef, offscreenContentRef } = this;

    if (offscreenRef) {
      this.offscreenRef.removeEventListener(
        'focusin',
        this.handleOffscreenFocusIn
      );
      this.offscreenRef.addEventListener(
        'focusin',
        this.handleOffscreenFocusIn
      );
      this.offscreenRef.removeEventListener(
        'focusout',
        this.handleOffscreenFocusOut
      );
      this.offscreenRef.addEventListener(
        'focusout',
        this.handleOffscreenFocusOut
      );
    }

    // Manually handle offscreen content since it has a -1 tab index
    if (offscreenContentRef) {
      this.offscreenContentRef.removeEventListener(
        'focusin',
        this.handleOffscreenContentFocusIn
      );
      this.offscreenContentRef.addEventListener(
        'focusin',
        this.handleOffscreenContentFocusIn
      );
      this.offscreenContentRef.removeEventListener(
        'focusout',
        this.handleOffscreenContentFocusOut
      );
      this.offscreenContentRef.addEventListener(
        'focusout',
        this.handleOffscreenContentFocusOut
      );
    }
  };

  handleOffscreenContentFocusIn = ({ target }) => {
    if (target === this.offscreenContentRef) {
      this.setState({ offscreenContentFocus: true });
    }
  };

  handleOffscreenContentFocusOut = ({ target }) => {
    if (target === this.offscreenContentRef) {
      this.setState({ offscreenContentFocus: false });
    }
  };

  handleOffscreenFocusIn = ({ target }) => {
    const { offscreenRef, visibleRef, getFocusableElements } = this;
    const offscreenFocusable = getFocusableElements(offscreenRef);
    const visibleFocusable = getFocusableElements(visibleRef);
    const elementIndex = offscreenFocusable.findIndex(
      element => element === target
    );

    if (elementIndex === -1) {
      return;
    }

    // Tag focusable elements
    for (var element of visibleFocusable) {
      element.setAttribute('data-focusable', 'true');
      element.setAttribute('tabindex', '-1');
    }

    visibleFocusable[elementIndex].classList.add('dqpl-focus-active');
  };

  handleOffscreenFocusOut = ({ target }) => {
    const { offscreenRef, visibleRef, getFocusableElements } = this;
    const offscreenFocusable = getFocusableElements(offscreenRef);
    const visibleFocusable = getFocusableElements(visibleRef);
    const elementIndex = offscreenFocusable.findIndex(
      element => element === target
    );

    visibleFocusable[elementIndex].classList.remove('dqpl-focus-active');
  };

  positionRelativeToTarget = () => {
    const { target, portal, arrowPosition } = this.props;

    if (!target) {
      return;
    }

    let targetNode = target.current || target;

    let { top, left, width, height } = targetNode.getBoundingClientRect();
    if (portal && portal !== document.body) {
      // If the portal is not placed on document.body
      // position the FTPO relative to the portal
      let rect = portal.getBoundingClientRect();
      top -= rect.top - portal.scrollTop;
      left -= rect.left - portal.scrollLeft;
    }

    const [arrowBoxSide] = arrowPosition.split('-');

    let style;
    switch (arrowBoxSide) {
      case 'right':
        style = {
          left: `${left}px`,
          top: `${top + height / 2}px`
        };
        break;
      case 'bottom':
        style = {
          top: `${top}px`,
          left: `${left + width / 2}px`
        };
        break;
      case 'left':
        style = {
          left: `${left + width}px`,
          top: `${top + height / 2}px`
        };
        break;
      case 'top':
      default:
        style = {
          top: `${top + height}px`,
          left: `${left + width / 2}px`
        };
        break;
    }

    this.setState({ style });
  };

  componentDidUpdate(nextProps) {
    const { props, attachOffscreenListeners, positionRelativeToTarget } = this;
    if (
      props.arrowPosition !== nextProps.arrowPosition ||
      props.portal !== nextProps.portal ||
      props.target !== nextProps.target
    ) {
      attachOffscreenListeners();
      positionRelativeToTarget();
    }
  }

  render() {
    const { show, style, offscreenContentFocus, headingId } = this.state;
    const {
      heading,
      ftpRef,
      children,
      noArrow,
      dismissText,
      arrowPosition,
      className,
      target,
      portal = document.body
    } = this.props;

    if (!show) {
      return null;
    }

    const FTPO = (
      <div
        className={classNames(className, 'dqpl-pointer-wrap', {
          'dqpl-no-arrow': noArrow,
          'dqpl-ftpo-auto': !!target,
          [arrowPosition]: !!arrowPosition && !noArrow
        })}
        style={style}
        role={target ? null : 'region'}
        aria-labelledby={heading ? headingId : null}
        aria-hidden={!!target}
        ref={el => (this.visibleRef = el)}
      >
        {noArrow ? null : (
          <div
            className={classNames('dqpl-arrow', {
              [arrowPosition]: !!arrowPosition && !noArrow
            })}
          >
            <div className="dqpl-arrow-pointer" />
            <div className="dqpl-arrow-neck" />
          </div>
        )}
        <div className="dqpl-box">
          <button
            className="dqpl-ftpo-dismiss fa fa-close"
            type="button"
            aria-label={dismissText}
            onClick={this.onCloseClick}
            tabIndex={target ? -1 : 0}
          />
          {/* eslint-disable jsx-a11y/no-noninteractive-tabindex */}
          <div
            className={classNames('dqpl-content', {
              'dqpl-content-focus-active': offscreenContentFocus
            })}
            tabIndex={!target ? -1 : null}
            ref={ftpRef}
          >
            {heading &&
              React.cloneElement(heading, { id: target ? null : headingId })}
            {target ? removeIds(children) : children}
          </div>
          {/* eslint-enable jsx-a11y/no-noninteractive-tabindex */}
        </div>
      </div>
    );

    if (target && portal) {
      return (
        <React.Fragment>
          <div
            className="dqpl-offscreen"
            role="region"
            aria-labelledby={heading ? headingId : null}
            ref={el => (this.offscreenRef = el)}
          >
            <button
              type="button"
              aria-label={dismissText}
              onClick={this.onCloseClick}
            />
            <div
              className="dqpl-content"
              tabIndex="-1"
              ref={el => (this.offscreenContentRef = el)}
            >
              {heading && React.cloneElement(heading, { id: headingId })}
              {children}
            </div>
          </div>
          {createPortal(FTPO, portal)}
        </React.Fragment>
      );
    }

    return FTPO;
  }

  onCloseClick() {
    this.setState({ show: false });
    this.props.onClose();
  }
}

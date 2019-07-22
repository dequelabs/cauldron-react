import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const __Element = typeof Element === 'undefined' ? function() {} : Element;

export default class FirstTimePointOut extends Component {
  static propTypes = {
    headerId: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    ftpRef: PropTypes.func,
    noArrow: PropTypes.bool,
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

    if (
      process.env.NODE_ENV === 'development' &&
      props.target &&
      props.noArrow === true
    ) {
      throw new Error(
        `FirstTimePointOut: A "target" prop with "noArrow=true" is not currently supported.`
      );
    }
  }

  componentDidMount() {
    const { positionRelativeToTarget, attachOffscreenListeners } = this;

    positionRelativeToTarget();

    // debounce resize event to rAF
    this.resizeDebounce = () => {
      if (this.resizeDebounce) {
        cancelAnimationFrame(this.resizeDebounce);
      }
      this.resizeDebounce = requestAnimationFrame(() => {
        this.positionRelativeToTarget();
      });
    };
    window.addEventListener('resize', this.resizeDebounce);
    attachOffscreenListeners();
  }

  forceUpdate() {
    super.forceUpdate();
    requestAnimationFrame(() => this.positionRelativeToTarget());
  }

  componentWillUnmount() {
    const {
      resizeDebounce,
      offscreenButtonRef,
      offscreenContentRef,
      handleOffscreenButtonFocusIn,
      handleOffscreenButtonFocusOut,
      handleOffscreenContentFocusIn,
      handleOffscreenContentFocusOut
    } = this;

    if (resizeDebounce) {
      window.removeEventListener('resize', resizeDebounce);
    }

    if (offscreenButtonRef) {
      offscreenButtonRef.removeEventListener(
        'focusin',
        handleOffscreenButtonFocusIn
      );
      offscreenButtonRef.removeEventListener(
        'focusout',
        handleOffscreenButtonFocusOut
      );
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

  handleOffscreenButtonFocusIn = () => {
    this.setState({ offscreenButtonFocus: true });
  };

  handleOffscreenButtonFocusOut = () => {
    this.setState({ offscreenButtonFocus: false });
  };

  handleOffscreenContentFocusIn = () => {
    this.setState({ offscreenContentFocus: true });
  };

  handleOffscreenContentFocusOut = () => {
    this.setState({ offscreenContentFocus: false });
  };

  // Mirror the offscreen button focus to the visible content
  attachOffscreenListeners = () => {
    const {
      offscreenButtonRef,
      offscreenContentRef,
      handleOffscreenButtonFocusIn,
      handleOffscreenButtonFocusOut,
      handleOffscreenContentFocusIn,
      handleOffscreenContentFocusOut
    } = this;

    if (offscreenButtonRef) {
      offscreenButtonRef.removeEventListener(
        'focusin',
        handleOffscreenButtonFocusIn
      );
      offscreenButtonRef.removeEventListener(
        'focusout',
        handleOffscreenButtonFocusOut
      );
      offscreenButtonRef.addEventListener(
        'focusin',
        handleOffscreenButtonFocusIn
      );
      offscreenButtonRef.addEventListener(
        'focusout',
        handleOffscreenButtonFocusOut
      );
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
      offscreenContentRef.addEventListener(
        'focusin',
        handleOffscreenContentFocusIn
      );
      offscreenContentRef.addEventListener(
        'focusout',
        handleOffscreenContentFocusOut
      );
    }
  };

  positionRelativeToTarget = () => {
    const { target, portal, arrowPosition } = this.props;

    if (!(target || (target && target.current))) {
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
      props.portal !== nextProps.portal
    ) {
      attachOffscreenListeners();
      positionRelativeToTarget();
    }
  }

  render() {
    const {
      show,
      style,
      offscreenButtonFocus,
      offscreenContentFocus
    } = this.state;
    const {
      headerId,
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
        role="region"
        aria-labelledby={headerId}
        aria-hidden={!!target}
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
            className={classNames('dqpl-ftpo-dismiss fa fa-close', {
              'dqpl-focus-active': offscreenButtonFocus
            })}
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
            {children}
          </div>
          {/* eslint-enable jsx-a11y/no-noninteractive-tabindex */}
        </div>
      </div>
    );

    if (target && portal) {
      return (
        <React.Fragment>
          <div className="dqpl-offscreen">
            <button
              type="button"
              ref={el => (this.offscreenButtonRef = el)}
              aria-label={dismissText}
              onClick={this.onCloseClick}
            />
            <div
              className="dqpl-content"
              tabIndex="-1"
              ref={el => (this.offscreenContentRef = el)}
            >
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

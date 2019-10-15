import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AriaIsolate from '../../utils/aria-isolate';
import { typeMap, tabIndexHandler } from './utils';

/**
 * The cauldron toast notification component
 */
export default class Toast extends Component {
  static propTypes = {
    // the ui to be added as the message of the toast
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array
    ]).isRequired,
    // "confirmation", "caution", or "action-needed"
    type: PropTypes.string.isRequired,
    // function to be exectued when toast is dismissed
    onDismiss: PropTypes.func,
    // if provided, should be a number in ms
    autoHide: PropTypes.number,
    // text to be added as the aria-label of the "x" dismiss button (default: "Dismiss")
    dismissText: PropTypes.string,
    // an optional ref function to get a handle on the toast element
    toastRef: PropTypes.func,
    // whether or not to show the toast
    show: PropTypes.bool
  };

  static defaultProps = {
    dismissText: 'Dismiss',
    onDismiss: () => {},
    toastRef: () => {},
    show: false
  };

  constructor(props) {
    super(props);

    this.state = {
      animationClass: props.show ? 'dqpl-fadein-flex' : 'dqpl-hidden'
    };

    this.dismissToast = this.dismissToast.bind(this);
    this.showToast = this.showToast.bind(this);
  }

  componentDidMount() {
    const { autoHide, show } = this.props;

    if (show) {
      // Timeout because CSS display: none/block and opacity:
      // 0/1 properties cannot be toggled in the same tick
      // see: https://codepen.io/isnerms/pen/eyQaLP
      setTimeout(this.showToast);
      if (autoHide) {
        setTimeout(this.dismissToast, autoHide);
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { show } = this.props;
    if (prevProps.show !== show) {
      if (show) {
        this.setState({ animationClass: 'dqpl-fadein-flex' }, () => {
          setTimeout(this.showToast);
        });
      } else {
        this.dismissToast();
      }
    }
  }

  render() {
    const { animationClass } = this.state;
    const { type, children, dismissText, toastRef, show } = this.props;
    const scrim =
      type === 'action-needed' && show ? (
        <div className="dqpl-scrim-light dqpl-scrim-show dqpl-scrim-fade-in" />
      ) : null;

    return (
      <Fragment>
        <div
          tabIndex={-1}
          className={`dqpl-toast dqpl-toast-${
            typeMap[type].className
          } ${animationClass}`}
          ref={el => {
            toastRef(el);
            this.el = el;
          }}
        >
          <div className="dqpl-toast-message">
            <div className={`fa ${typeMap[type].icon}`} aria-hidden="true" />
            <span>{children}</span>
          </div>
          {type !== 'action-needed' && (
            <button
              type="button"
              className={'dqpl-toast-dismiss fa fa-close'}
              aria-label={dismissText}
              onClick={this.dismissToast}
            />
          )}
        </div>
        {scrim}
      </Fragment>
    );
  }

  dismissToast() {
    if (!this.el) {
      return;
    }
    const { onDismiss, type } = this.props;
    const { isolator } = this.state;

    this.setState(
      {
        animationClass: 'dqpl-fadein-flex'
      },
      () => {
        // Timeout because CSS display: none/block and opacity:
        // 0/1 properties cannot be toggled in the same tick
        // see: https://codepen.io/isnerms/pen/eyQaLP
        setTimeout(() => {
          if (type === 'action-needed') {
            tabIndexHandler(true, this.el);
            isolator.deactivate();
          }

          this.setState({ animationClass: 'dqpl-hidden' }, onDismiss);
        });
      }
    );
  }

  showToast() {
    const { type } = this.props;

    this.setState(
      {
        animationClass: 'dqpl-fadein-flex dqpl-fadein'
      },
      () => {
        if (type === 'action-needed') {
          const isolator = new AriaIsolate(this.el);
          tabIndexHandler(false, this.el);
          this.setState({ isolator });
          isolator.activate();
        }

        if (this.el) {
          // focus the toast
          this.el.focus();
        }
      }
    );
  }
}

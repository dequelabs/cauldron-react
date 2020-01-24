import React from 'react';
import AriaIsolate from '../../utils/aria-isolate';
import { typeMap, tabIndexHandler } from './utils';

export interface ToastProps {
  type: 'confirmation' | 'caution' | 'action-needed';
  onDismiss: () => void;
  autoHide?: number;
  dismissText?: string;
  toastRef: RefCallback<HTMLDivElement>;
  show?: boolean;
}

interface ToastState {
  animationClass: string;
  isolator?: AriaIsolate;
}

/**
 * The cauldron toast notification component
 */
export default class Toast extends React.Component<ToastProps, ToastState> {
  static defaultProps = {
    dismissText: 'Dismiss',
    onDismiss: () => {},
    toastRef: () => {},
    show: false
  };

  private el: HTMLDivElement | null;

  constructor(props: ToastProps) {
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

  componentDidUpdate(prevProps: ToastProps) {
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
      <React.Fragment>
        <div
          tabIndex={-1}
          className={`dqpl-toast dqpl-toast-${typeMap[type].className} ${animationClass}`}
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
      </React.Fragment>
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
            isolator?.deactivate();
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

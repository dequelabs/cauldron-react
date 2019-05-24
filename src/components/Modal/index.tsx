import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import FocusTrap = require('focus-trap-react');
import Offscreen from '../Offscreen';
import Scrim from '../Scrim';
import ClickOutsideListener from '../ClickOutsideListener';
import AriaIsolate from '../../utils/aria-isolate';

const noop = () => {};

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  show?: boolean;
  modalRef?: (ref: HTMLDivElement | null) => void;
  onClose: () => void;
  forceAction?: boolean;
  heading: {
    level?: number;
    text: string;
  };
  closeButtonText?: string;
}

interface ModalState {
  isolator?: AriaIsolate;
}

// TODO: separate out common logic (some duplicate of <Alert />)
export default class Modal extends React.Component<ModalProps, ModalState> {
  public static displayName = 'Modal';

  public static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    show: PropTypes.bool,
    modalRef: PropTypes.func,
    onClose: PropTypes.func,
    forceAction: PropTypes.bool,
    heading: PropTypes.object.isRequired,
    closeButtonText: PropTypes.string
  };

  public static defaultProps = {
    onClose: noop,
    forceAction: false,
    closeButtonText: 'Close',
    modalRef: noop
  };

  public readonly state: ModalState = {};

  private element: HTMLDivElement | null = null;
  private heading: HTMLHeadingElement | null = null;

  public componentDidMount() {
    if (this.props.show) {
      this.attachIsolator(() => setTimeout(this.focusHeading));
    }
  }

  public componentDidUpdate(prevProps: ModalProps) {
    if (!prevProps.show && this.props.show) {
      this.attachIsolator(this.focusHeading);
    } else if (prevProps.show && !this.props.show) {
      this.close();
    }
  }

  private attachIsolator(done: () => void) {
    this.setState(
      {
        isolator: new AriaIsolate(this.element)
      },
      done
    );
  }

  public render() {
    const {
      modalRef = noop,
      forceAction,
      className,
      children,
      closeButtonText,
      heading,
      show,
      ...other
    } = this.props;

    if (!show) {
      return null;
    }

    const close = !forceAction ? (
      <button
        className="dqpl-close dqpl-icon"
        type="button"
        onClick={this.close}
      >
        <div className="fa fa-close" aria-hidden="true" />
        <Offscreen>{closeButtonText}</Offscreen>
      </button>
    ) : null;
    return (
      <FocusTrap
        focusTrapOptions={{
          onDeactivate: this.close,
          escapeDeactivates: !forceAction,
          fallbackFocus: '.dqpl-modal-heading'
        }}
      >
        <ClickOutsideListener onClickOutside={this.handleClickOutside}>
          <div
            role="dialog"
            className={classNames('dqpl-modal', className, {
              'dqpl-dialog-show': show
            })}
            ref={el => {
              this.element = el;
              modalRef(el);
            }}
            {...other}
          >
            <div className="dqpl-dialog-inner">
              <div className="dqpl-modal-header">
                {React.createElement(
                  `h${heading.level || 2}`,
                  {
                    className: 'dqpl-modal-heading',
                    ref: (el: HTMLHeadingElement | null) => {
                      this.heading = el;
                    },
                    tabIndex: -1
                  },
                  heading.text
                )}
                {close}
              </div>
              {children}
            </div>
          </div>
        </ClickOutsideListener>
        <Scrim show={show} />
      </FocusTrap>
    );
  }

  public close = () => {
    if (this.state.isolator) {
      this.state.isolator.deactivate();
    }
    this.props.onClose();
  };

  public handleClickOutside = () => {
    const { show, forceAction } = this.props;
    if (show && !forceAction) {
      this.close();
    }
  };

  public focusHeading = () => {
    if (this.heading) {
      this.heading.focus();
    }
    if (this.state.isolator) {
      this.state.isolator.activate();
    }
  };
}

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalContent = ({ children, ...other }: ModalContentProps) => (
  <div className="dqpl-content" {...other}>
    {children}
  </div>
);

ModalContent.displayName = 'ModalContent';
ModalContent.propTypes = { children: PropTypes.node.isRequired };

interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalFooter = ({ children, ...other }: ModalFooterProps) => (
  <div className="dqpl-modal-footer" {...other}>
    {children}
  </div>
);

ModalFooter.displayName = 'ModalFooter';
ModalFooter.propTypes = { children: PropTypes.node.isRequired };

export { ModalContent, ModalFooter };

import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as FocusTrap from 'focus-trap-react';
import cx from 'classnames';
import { RefCallback } from '../../../types';
import AriaIsolate from '../../utils/aria-isolate';
import Offscreen from '../Offscreen';
import Scrim from '../Scrim';

interface ModalHeading {
  text: string;
  level?: number;
}

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  show?: boolean;
  modalRef?: RefCallback;
  onClose?: () => void;
  forceAction?: boolean;
  heading: ModalHeading;
  closeButtonText?: string;
}

interface ModalState {
  isolator: AriaIsolate | null;
}

export default class Modal extends React.Component<ModalProps> {
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

  public readonly state: ModalState = {
    isolator: null
  };

  private element: HTMLElement | null = null;
  private heading: HTMLElement | null = null;

  public render() {
    const {
      modalRef,
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
    const Heading = `h${heading.level || 2}`;

    return (
      <FocusTrap
        focusTrapOptions={{
          onDeactivate: this.close,
          escapeDeactivates: !forceAction,
          fallbackFocus: '.dqpl-modal-heading'
        }}
      >
        <div
          role="dialog"
          className={cx('dqpl-modal', className, {
            'dqpl-dialog-show': show
          })}
          ref={this.setElementRef}
          {...other}
        >
          <div className="dqpl-dialog-inner">
            <div className="dqpl-modal-header">
              {this.renderHeading()}
              {close}
            </div>
            {children}
          </div>
          <Scrim show={show} />
        </div>
      </FocusTrap>
    );
  }

  public componentDidMount() {
    if (!this.props.show) {
      return;
    }

    this.attachIsolator(() => setTimeout(this.focusHeading));
  }

  public componentDidUpdate(prevProps: ModalProps) {
    if (!prevProps.show && this.props.show) {
      this.attachIsolator(this.focusHeading);
    } else if (prevProps.show && !this.props.show) {
      this.close();
    }
  }

  private renderHeading() {
    const { level = 2, text } = this.props.heading;
    const type = `h${level}`;
    return React.createElement(
      type,
      {
        className: 'dqpl-modal-heading',
        ref: this.setHeadingRef,
        tabIndex: -1
      },
      text
    );
  }

  private setHeadingRef(el: HTMLElement) {
    this.heading = el;
  }

  private setElementRef(el: HTMLElement | null) {
    this.element = el;
    const { modalRef } = this.props;
    if (typeof modalRef === 'function') {
      modalRef(el);
    }
  }

  private close = () => {
    const { isolator } = this.state;
    if (isolator) {
      isolator.deactivate();
    }

    const { onClose } = this.props;
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  private focusHeading = () => {
    if (this.heading) {
      this.heading.focus();
    }
    const { isolator } = this.state;
    if (isolator) {
      isolator.activate();
    }
  };

  private attachIsolator = (done: () => void) => {
    if (!this.element) {
      return done();
    }

    this.setState({ isolator: new AriaIsolate(this.element) }, done);
  };
}

interface ContentProps {
  children: React.ReactNode;
}

export const Content = ({ children }: ContentProps) => (
  <div className="dqpl-content">{children}</div>
);

Content.displayName = 'Content';

Content.propTypes = { children: PropTypes.node.isRequired };

interface FooterProps {
  children: React.ReactNode;
}

export const Footer = ({ children }: FooterProps) => (
  <div className="dqpl-modal-footer">{children}</div>
);

Footer.displayName = 'Footer';

Footer.propTypes = { children: PropTypes.node.isRequired };

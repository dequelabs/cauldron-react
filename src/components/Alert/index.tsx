import * as React from 'react';
import * as PropTypes from 'prop-types';
import FocusTrap = require('focus-trap-react');
import Scrim from '../Scrim';
import AriaIsolate from '../../utils/aria-isolate';

interface ActionsProps {
  children: React.ReactNode;
}

const noop = () => {};

export const Actions = ({ children }: ActionsProps) => (
  <div className="dqpl-buttons">{children}</div>
);

Actions.displayName = 'AlertActions';

interface AlertProps {
  children: React.ReactNode;
  show?: boolean;
  className?: string;
  contentRef?: (ref: HTMLDivElement | null) => void;
  alertRef?: (ref: HTMLDivElement | null) => void;
  onClose: () => void;
  forceAction?: boolean;
}

interface AlertState {
  show: boolean;
  isolator?: AriaIsolate;
}

/**
 * Cauldron <Alert /> component
 */
export default class Alert extends React.Component<AlertProps, AlertState> {
  public static displayName = 'Alert';

  public static propTypes = {
    children: PropTypes.node.isRequired,
    show: PropTypes.bool,
    className: PropTypes.string,
    contentRef: PropTypes.func,
    alertRef: PropTypes.func,
    onClose: PropTypes.func,
    forceAction: PropTypes.bool
  };

  public static defaultProps = {
    onClose: noop,
    forceAction: false,
    alertRef: noop,
    contentRef: noop
  };

  public readonly state: AlertState;

  private element: HTMLDivElement | null = null;
  private content: HTMLDivElement | null = null;

  constructor(props: AlertProps) {
    super(props);

    this.state = {
      show: props.show || false
    };

    this.close = this.close.bind(this);
    this.focusContent = this.focusContent.bind(this);
  }

  public componentDidMount() {
    if (this.props.show) {
      this.attachIsolator(() => setTimeout(this.focusContent));
    }
  }

  public componentDidUpdate(prevProps: AlertProps) {
    const showChange = prevProps.show !== this.props.show;

    if (!showChange) {
      return;
    }

    this.setState({ show: this.props.show || false }, () => {
      if (this.props.show) {
        this.attachIsolator(this.focusContent);
      } else {
        this.close();
      }
    });
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
    const { show } = this.state;
    const {
      alertRef = noop,
      contentRef = noop,
      forceAction,
      className
    } = this.props;
    const cl = className || '';
    const alertClass = show ? 'dqpl-dialog-show' : '';

    if (!show) {
      return null;
    }

    return (
      <FocusTrap
        focusTrapOptions={{
          onDeactivate: this.close,
          escapeDeactivates: !forceAction,
          fallbackFocus: '.dqpl-dialog-inner'
        }}
      >
        <div
          className={['dqpl-alert', alertClass, cl].join(' ')}
          role="alertdialog"
          ref={el => {
            this.element = el;
            alertRef(el);
          }}
        >
          <div
            className="dqpl-dialog-inner"
            ref={el => {
              this.content = el;
              contentRef(el);
            }}
            tabIndex={-1}
          >
            <div className="dqpl-content">{this.props.children}</div>
          </div>
          <Scrim show={show} />
        </div>
      </FocusTrap>
    );
  }

  private close() {
    if (this.state.isolator) {
      this.state.isolator.deactivate();
    }
    this.setState({ show: false });
    this.props.onClose();
  }

  private focusContent() {
    if (this.content) {
      this.content.focus();
    }
    if (this.state.isolator) {
      this.state.isolator.activate();
    }
  }
}

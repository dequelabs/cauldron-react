import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as FocusTrap from 'focus-trap-react';
import { RefCallback } from '../../types';
import AriaIsolate from '../../utils/aria-isolate';
import Scrim from '../Scrim';

const noop = () => {};

interface ActionProps {
  children: React.ReactNode;
}

export const Actions = ({ children }: ActionProps) => (
  <div className="dqpl-buttons">{children}</div>
);

Actions.displayName = 'AlertAFctions';

Actions.propTypes = { children: PropTypes.node.isRequired };

interface AlertProps {
  className?: string;
  children: React.ReactNode;
  show?: boolean;
  contentRef?: RefCallback;
  alertRef?: RefCallback;
  onClose: () => void;
  forceAction?: boolean;
}

interface AlertState {
  show: boolean;
  isolator?: AriaIsolate;
}

export default class Alert extends React.Component<AlertProps, AlertState> {
  public static displayName = 'Alert';

  public static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    show: PropTypes.bool,
    contentRef: PropTypes.func,
    alertRef: PropTypes.func,
    onClose: PropTypes.func,
    forceAction: PropTypes.bool
  };

  private element: HTMLElement | null = null;
  private content: HTMLElement | null = null;

  constructor(props) {
    super(props);
    this.state = { show: props.show };
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

  public componentDidMount() {
    if (this.props.show) {
      this.attachIsolator(() => setTimeout(this.focusContent));
    }
  }

  public componentDidUpdate(prevProps) {
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

  private close = () => {
    const { isolator } = this.state;
    if (isolator) {
      isolator.deactivate();
    }

    this.setState({ show: false });
    this.props.onClose();
  };

  private focusContent = () => {
    if (this.content) {
      this.content.focus();
    }

    const { isolator } = this.state;
    if (isolator) {
      isolator.activate();
    }
  };

  private attachIsolator = (done?: () => void) => {
    this.setState(
      {
        isolator: new AriaIsolate(this.element)
      },
      done
    );
  };
}

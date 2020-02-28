import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import Scrim from '../Scrim';
import AriaIsolate from '../../utils/aria-isolate';

const noop = () => {};
export const Actions = ({ children }) => (
  <div className="dqpl-buttons">{children}</div>
);

Actions.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]).isRequired
};

/**
 * Cauldron <Alert /> component
 */
export default class Alert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.show
    };

    this.close = this.close.bind(this);
    this.focusContent = this.focusContent.bind(this);
  }

  componentDidMount() {
    if (this.props.show) {
      this.attachIsolator(() => setTimeout(this.focusContent));
    }
  }

  componentDidUpdate(prevProps) {
    const showChange = prevProps.show !== this.props.show;

    if (!showChange) {
      return;
    }

    this.setState({ show: this.props.show }, () => {
      if (this.props.show) {
        this.attachIsolator(this.focusContent);
      } else {
        this.close();
      }
    });
  }

  attachIsolator(done) {
    this.setState(
      {
        isolator: new AriaIsolate(this.element)
      },
      done
    );
  }

  render() {
    const { show } = this.state;
    const { alertRef, contentRef, forceAction, className } = this.props;
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

  close() {
    this.state.isolator.deactivate();
    this.setState({ show: false });
    this.props.onClose();
  }

  focusContent() {
    if (this.content) {
      this.content.focus();
    }
    this.state.isolator.activate();
  }
}

Alert.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]).isRequired,
  show: PropTypes.bool,
  contentRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  alertRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  onClose: PropTypes.func,
  forceAction: PropTypes.bool
};

Alert.defaultProps = {
  onClose: noop,
  forceAction: false,
  alertRef: noop,
  contentRef: noop
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';
import Offscreen from '../../commons/Offscreen';
import Scrim from '../../commons/Scrim';
import AriaIsolate from '../../utils/aria-isolate';

const noop = () => {};
const commonProps = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]).isRequired
};

// TODO: separate out common logic (some duplicate of <Alert />)
export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.close = this.close.bind(this);
    this.focusHeading = this.focusHeading.bind(this);
  }

  componentDidMount() {
    if (this.props.show) {
      this.attachIsolator(() => setTimeout(this.focusHeading));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { show } = nextProps;

    if (!show && this.props.show) {
      this.close();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      this.attachIsolator(this.focusHeading);
    }
  }

  attachIsolator(done) {
    this.setState({
      isolator: new AriaIsolate(this.element)
    }, done);
  }

  render() {
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

    if (!show) { return null; }

    const close = !forceAction
      ? (
        <button className='dqpl-close dqpl-icon' type='button' onClick={this.close}>
          <div className='fa fa-close' aria-hidden='true' />
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
          role='dialog'
          className={classNames('dqpl-modal', className, { 'dqpl-dialog-show': show })}
          ref={el => {
            this.element = el;
            modalRef(el);
          }}
          {...other}
        >
          <div className='dqpl-dialog-inner'>
            <div className='dqpl-modal-header'>
              <Heading
                className='dqpl-modal-heading'
                ref={el => this.heading = el}
                tabIndex={-1}
              >
                {heading.text}
              </Heading>
              {close}
            </div>
            {children}
          </div>
          <Scrim show={show} />
        </div>
      </FocusTrap>
    );
  }

  close() {
    this.state.isolator.deactivate();
    this.props.onClose();
  }

  focusHeading() {
    if (this.heading) { this.heading.focus(); }
    this.state.isolator.activate();
  }
}

Modal.propTypes = {
  ...commonProps,
  className: PropTypes.string,
  show: PropTypes.bool,
  modalRef: PropTypes.func,
  onClose: PropTypes.func,
  forceAction: PropTypes.bool,
  heading: PropTypes.object.isRequired,
  closeButtonText: PropTypes.string
};

Modal.defaultProps = {
  onClose: noop,
  forceAction: false,
  closeButtonText: 'Close',
  modalRef: noop
};

const Content = ({children}) => (<div className='dqpl-content'>{children}</div>);
Content.propTypes = commonProps;

const Footer = ({children}) => (<div className='dqpl-modal-footer'>{children}</div>);
Footer.propTypes = commonProps;

export { Content, Footer };

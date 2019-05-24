import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class FirstTimePointOut extends Component {
  static propTypes = {
    headerId: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    ftpRef: PropTypes.func,
    noArrow: PropTypes.bool,
    arrowPosition: PropTypes.string,
    onClose: PropTypes.func,
    dismissText: PropTypes.string,
    className: PropTypes.string
  };

  static defaultProps = {
    ftpRef: () => {},
    noArrow: false,
    onClose: () => {},
    dismissText: 'dismiss',
    arrowPosition: 'top-left'
  };

  constructor() {
    super();

    this.state = { show: true };
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  render() {
    const { show } = this.state;
    const {
      headerId,
      ftpRef,
      children,
      noArrow,
      dismissText,
      arrowPosition,
      className
    } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div
        className={classNames(className, 'dqpl-pointer-wrap', {
          'dqpl-no-arrow': noArrow
        })}
        role="region"
        aria-labelledby={headerId}
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
          />
          <div className="dqpl-content" tabIndex="-1" ref={ftpRef}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  onCloseClick() {
    this.setState({ show: false });
    this.props.onClose();
  }
}

FirstTimePointOut.defaultProps = {
  onClose: () => {}
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less';

export default class FirstTimePointOut extends Component {
  static propTypes = {
    headerId: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string
    ]).isRequired,
    ftpRef: PropTypes.func,
    noArrow: PropTypes.bool,
    onClose: PropTypes.func,
    dismissText: PropTypes.string
  }

  static defaultProps = {
    onClose: () => {},
    dismissText: 'dismiss'
  }

  constructor() {
    super();

    this.state = { show: true };
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  render() {
    const { show } = this.state;
    const { headerId, ftpRef, children, noArrow, dismissText } = this.props;

    if (!show) { return null; }

    return (
      <div
        className={classNames('dqpl-pointer-wrap', {
          'dqpl-no-arrow': noArrow
        })}
        role='region'
        aria-labelledby={headerId}
      >
        {
          noArrow ? null : (
            <div className='dqpl-arrow'>
              <div className='dqpl-arrow-pointer'></div>
              <div className='dqpl-arrow-neck'></div>
            </div>
          )
        }
        <div className='dqpl-box'>
          <button
            className='dqpl-ftp-dismiss fa fa-close'
            type='button'
            aria-label={dismissText}
            onClick={this.onCloseClick}
          />
          <div className='dqpl-content' tabIndex='-1' ref={ftpRef}>{children}</div>
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

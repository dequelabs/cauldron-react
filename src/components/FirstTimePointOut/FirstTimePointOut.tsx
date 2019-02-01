import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import { RefCallback } from '../../types';

interface FirstTimePointOutProps {
  headerId: string;
  children: React.ReactNode;
  ftpRef: RefCallback;
  noArrow?: boolean;
  onClose: () => void;
  dismissText?: string;
}

interface FirstTimePointOutState {
  show: boolean;
}

class FirstTimePointOut extends React.Component<
  FirstTimePointOutProps,
  FirstTimePointOutState
> {
  public static displayName = 'FirstTimePointOut';

  public static propTypes = {
    headerId: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    ftpRef: PropTypes.func,
    noArrow: PropTypes.bool,
    onClose: PropTypes.func,
    dismissText: PropTypes.string
  };

  public readonly state: FirstTimePointOutState = {
    show: true
  };

  public render() {
    const { show } = this.state;
    const {
      headerId,
      ftpRef,
      children,
      noArrow = false,
      dismissText = 'dismiss'
    } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div
        className={cx('dqpl-pointer-wrap', {
          'dqpl-no-arrow': noArrow
        })}
        role="region"
        aria-labelledby={headerId}
      >
        {noArrow ? null : (
          <div className="dqpl-arrow">
            <div className="dqpl-arrow-pointer" />
            <div className="dqpl-arrow-neck" />
          </div>
        )}
        <div className="dqpl-box">
          <button
            className="dqpl-ftp-dismiss fa fa-close"
            type="button"
            aria-label={dismissText}
            onClick={this.onCloseClick}
          />
          <div className="dqpl-content" tabIndex={-1} ref={ftpRef}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  private onCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ show: false });
    const { onClose } = this.props;
    if (typeof onClose === 'function') {
      onClose();
    }
  };
}

export default FirstTimePointOut;

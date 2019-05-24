import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

const noop = () => {};

interface FirstTimePointOutProps {
  headerId: string;
  children: React.ReactNode;
  ftpRef?: (ref: HTMLDivElement) => void;
  noArrow?: boolean;
  arrowPosition?: string; // TODO: replace with a union
  onClose: () => void;
  dismissText?: string;
  className?: string;
}

interface FirstTimePointOutState {
  show: boolean;
}

export default class FirstTimePointOut extends React.Component<
  FirstTimePointOutProps,
  FirstTimePointOutState
> {
  public displayName = 'FirstTimePointOut';

  public static propTypes = {
    headerId: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    ftpRef: PropTypes.func,
    noArrow: PropTypes.bool,
    arrowPosition: PropTypes.string,
    onClose: PropTypes.func,
    dismissText: PropTypes.string,
    className: PropTypes.string
  };

  public static defaultProps = {
    ftpRef: noop,
    noArrow: false,
    onClose: noop,
    dismissText: 'dismiss',
    arrowPosition: 'top-left'
  };

  public readonly state: FirstTimePointOutState = { show: true };

  public render() {
    const { show } = this.state;
    const {
      headerId,
      ftpRef = noop,
      children,
      noArrow,
      dismissText = 'dismiss',
      arrowPosition = 'top-left',
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
          <div className="dqpl-content" tabIndex={-1} ref={ftpRef}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  private onCloseClick() {
    this.setState({ show: false });
    this.props.onClose();
  }
}

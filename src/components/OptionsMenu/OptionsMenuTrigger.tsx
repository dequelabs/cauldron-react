import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import keyname = require('keyname');
import { RefCallback } from '../../../types';

interface Props {
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  triggerRef?: RefCallback;
  className?: string;
}

interface State {
  expanded: boolean;
}

/**
 * The trigger button component to be used as the component
 * that triggers the opening of an <OptionsMenu />.
 *
 * NOTE: This component should be used to set/update the <OptionsMenu /> "show" property
 */

class OptionsMenuTrigger extends React.Component<Props, State> {
  public static displayName = 'OptionsMenuTrigger';

  public static propTypes = {
    onKeyDown: PropTypes.func,
    onClick: PropTypes.func,
    triggerRef: PropTypes.func,
    className: PropTypes.string
  };

  public readonly state: State = { expanded: false };

  public render() {
    const { expanded } = this.state;
    const { triggerRef, className, ...other } = this.props;

    return (
      <button
        type="button"
        {...other}
        aria-expanded={expanded}
        className={cx('dqpl-options-menu-trigger', className)}
        ref={triggerRef}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
      />
    );
  }

  private handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const { onKeyDown } = this.props;
    if (onKeyDown) {
      onKeyDown(e);
    }

    const { which, target } = e;
    const key = keyname(which);

    if (key === 'down') {
      e.preventDefault();
      (target as HTMLButtonElement).click();
    }
  };

  private handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }

    this.setState({
      expanded: !this.state.expanded
    });
  };
}

export default OptionsMenuTrigger;

import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import keyname = require('keyname');

const noop = () => {};

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  triggerRef?: (ref: HTMLButtonElement | null) => void;
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
export default class OptionsMenuTrigger extends React.Component<Props, State> {
  public static propTypes = {
    onKeyDown: PropTypes.func,
    onClick: PropTypes.func,
    triggerRef: PropTypes.func,
    className: PropTypes.string
  };

  public static defaultProps = {
    onKeyDown: noop,
    onClick: noop,
    triggerRef: noop
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
        className={classNames('dqpl-options-menu-trigger', className)}
        ref={triggerRef}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
      />
    );
  }

  private onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    this.setState({
      expanded: !this.state.expanded
    });
  };

  private onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
    const { which, target } = e;
    const key = keyname(which);

    if (key === 'down') {
      e.preventDefault();
      (target as HTMLElement).click();
    }
  };
}

import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import { RefCallback } from '../../types';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
  children?: React.ReactNode;
  className?: string;
  buttonRef?: RefCallback;
}

class Button extends React.Component<ButtonProps> {
  public static displayName = 'Button';

  public static propTypes = {
    secondary: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    buttonRef: PropTypes.func
  };

  public render() {
    const {
      secondary,
      children,
      className,
      buttonRef = () => {},
      ...other
    } = this.props;
    return (
      <button
        type={'button'}
        className={cx(className, {
          'dqpl-button-secondary': secondary,
          'dqpl-button-primary': !secondary
        })}
        ref={buttonRef}
        {...other}
      >
        {children}
      </button>
    );
  }
}

export default Button;

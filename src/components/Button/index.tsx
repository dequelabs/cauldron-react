import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'error' | 'link';
  children?: React.ReactNode;
  buttonRef: (ref: HTMLButtonElement | null) => void;
}

/**
 * The dqpl button component
 * @prop {String}       variant  visual appearance of the button
 * @prop {String|Object} children   Any desired child content of the button (a string of text or node(s))
 *
 * NOTE: All other props (i.e. onClick) passed will be applied to the dqpl button element
 * NOTE: to support stuff like refs, avoiding a stateless component
 */

class Button extends React.Component<ButtonProps> {
  public static displayName = 'Button';

  public static propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'error', 'link']),
    children: PropTypes.node,
    className: PropTypes.string,
    buttonRef: PropTypes.func
  };

  public static defaultProps = {
    variant: 'primary',
    buttonRef: () => {}
  };

  public render() {
    const { variant, children, className, buttonRef, ...other } = this.props;
    return (
      <button
        type={'button'}
        className={classNames(className, {
          'dqpl-button-primary': variant === 'primary',
          'dqpl-button-secondary': variant === 'secondary',
          'dqpl-button-error': variant === 'error',
          'dqpl-link': variant === 'link'
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

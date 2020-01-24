import React from 'react';
import classNames from 'classnames';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'error' | 'link';
  buttonRef?: Ref<HTMLButtonElement>;
}

/**
 * The dqpl button component
 * @prop {String}       variant  visual appearance of the button
 * @prop {String|Object} children   Any desired child content of the button (a string of text or node(s))
 *
 * NOTE: All other props (i.e. onClick) passed will be applied to the dqpl button element
 * NOTE: to support stuff like refs, avoiding a stateless component
 */
export default class Button extends React.Component<ButtonProps> {
  static defaultProps = {
    variant: 'primary',
    buttonRef: () => {}
  };

  render() {
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

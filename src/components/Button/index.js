import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * The dqpl button component
 * @prop {String}       variant  visual appearance of the button
 * @prop {String|Object} children   Any desired child content of the button (a string of text or node(s))
 *
 * NOTE: All other props (i.e. onClick) passed will be applied to the dqpl button element
 * NOTE: to support stuff like refs, avoiding a stateless component
 */
export default class Button extends Component {
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

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'error', 'link']),
  children: PropTypes.node,
  className: PropTypes.string,
  buttonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ])
};
Button.displayName = 'Button';
Button.defaultProps = {
  variant: 'primary',
  buttonRef: () => {}
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * The dqpl button component
 * @prop {String}       as  visual appearance of the button
 * @prop {String|Object} children   Any desired child content of the button (a string of text or node(s))
 *
 * NOTE: All other props (i.e. onClick) passed will be applied to the dqpl button element
 * NOTE: to support stuff like refs, avoiding a stateless component
 */
export default class Button extends Component {
  render() {
    const { as, children, className, buttonRef, ...other } = this.props;
    return (
      <button
        type={'button'}
        className={classNames(className, {
          'dqpl-button-primary': as === 'primary',
          'dqpl-button-secondary': as === 'secondary',
          'dqpl-button-error': as === 'error',
          'dqpl-link': as === 'link'
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
  as: PropTypes.oneOf(['primary', 'secondary', 'error', 'link']),
  link: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  className: PropTypes.string,
  buttonRef: PropTypes.func
};

Button.defaultProps = {
  as: 'primary',
  buttonRef: () => {}
};

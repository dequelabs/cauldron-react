import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * The dqpl button component
 * @prop {Boolean}       secondary  if the button should be a secondary (defaults to false aka primary)
 * @prop {String|Object} children   Any desired child content of the button (a string of text or node(s))
 *
 * NOTE: All other props (i.e. onClick) passed will be applied to the dqpl button element
 * NOTE: to support stuff like refs, avoiding a stateless component
 */
export default class Button extends Component {
  render() {
    const { secondary, children, className, buttonRef, ...other } = this.props;
    return (
      <button
        type={'button'}
        className={classNames(className, {
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

Button.propTypes = {
  secondary: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  buttonRef: PropTypes.func
};
Button.displayName = 'Button';
Button.defaultProps = {
  buttonRef: () => {}
};

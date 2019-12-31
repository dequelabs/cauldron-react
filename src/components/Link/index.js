import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Link = ({ children, linkRef, className, ...other }) => (
  <a ref={linkRef} className={classNames('dqpl-link', className)} {...other}>
    {children}
  </a>
);
Link.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  linkRef: PropTypes.func
};
Link.displayName = 'Link';
export default Link;

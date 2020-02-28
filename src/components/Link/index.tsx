import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  linkRef: Ref<HTMLAnchorElement>;
}

const Link = ({ children, linkRef, className, ...other }: LinkProps) => (
  <a ref={linkRef} className={classNames('dqpl-link', className)} {...other}>
    {children}
  </a>
);

Link.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  linkRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ])
};

Link.displayName = 'Link';

export default Link;

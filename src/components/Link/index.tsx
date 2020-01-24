import React from 'react';
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

export default Link;

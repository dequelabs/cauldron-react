import * as React from 'react';
import * as PropTypes from 'prop-types';

interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

const Link = ({ children, ...other }: LinkProps) => (
  <a className="dqpl-link" {...other}>
    {children}
  </a>
);

Link.displayName = 'Link';

Link.propTypes = {
  children: PropTypes.node.isRequired
};

export default Link;

import React from 'react';
import PropTypes from 'prop-types';

export default function Link({ children, ...other }) {
  return (
    <a className="dqpl-link" {...other}>
      {children}
    </a>
  );
}

Link.propTypes = {
  children: PropTypes.node.isRequired
};

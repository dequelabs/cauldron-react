import React from 'react';
import PropTypes from 'prop-types';

const Workspace = ({children, ...other}) => (
  <div className='dqpl-layout'>
    <div
      className='dqpl-main-content'
      role='main'
      {...other}
    >
      {children}
    </div>
  </div>
);


Workspace.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]).isRequired
};

export default Workspace;

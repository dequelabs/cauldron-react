import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const Wrapper = ({ className, ...other }) => (
  <div
    className={classNames('dqpl-options-menu-wrap', className)}
    {...other}
  />
);

Wrapper.propTypes = { className: PropTypes.string };

export default Wrapper;

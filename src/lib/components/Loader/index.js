import React from 'react';
import PropTypes from 'prop-types';

export default function Loader({ label, ...other }) {
  return (<div className='dqpl-loader' {...other} aria-label={label} />);
}

Loader.propTypes = {
  label: PropTypes.string.isRequired
};

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CardHeader = ({ className, ...other }) => (
  <div className={classNames('dqpl-tile-header', className)} {...other} />
);

CardHeader.displayName = 'CardHeader';
CardHeader.propTypes = {
  className: PropTypes.string
};
export default CardHeader;

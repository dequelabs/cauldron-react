import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CardContent = ({ className, ...other }) => (
  <div className={classNames('dqpl-tile-content', className)} {...other} />
);

CardContent.displayName = 'CardContent';
CardContent.propTypes = {
  className: PropTypes.string
};
export default CardContent;

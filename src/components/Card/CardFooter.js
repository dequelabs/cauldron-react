import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CardFooter = ({ className, ...other }) => (
  <div className={classNames('dqpl-tile-footer', className)} {...other} />
);

CardFooter.displayName = 'CardFooter';
CardFooter.propTypes = {
  className: PropTypes.string
};
export default CardFooter;

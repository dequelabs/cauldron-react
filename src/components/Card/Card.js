import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Card = ({ className, ...other }) => (
  <div className={classNames('dqpl-tile', className)} {...other} />
);

Card.displayName = 'Card';
Card.propTypes = {
  className: PropTypes.string
};
export default Card;

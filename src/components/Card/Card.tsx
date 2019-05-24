import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = ({ className, ...other }: CardProps) => (
  <div className={classNames('dqpl-tile', className)} {...other} />
);

Card.displayName = 'Card';
Card.propTypes = {
  className: PropTypes.string
};
export default Card;

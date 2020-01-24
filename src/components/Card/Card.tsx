import React from 'react';
import classNames from 'classnames';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = ({ className, ...other }: CardProps) => (
  <div className={classNames('dqpl-tile', className)} {...other} />
);

Card.displayName = 'Card';

export default Card;

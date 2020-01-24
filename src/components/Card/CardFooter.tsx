import React from 'react';
import classNames from 'classnames';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = ({ className, ...other }: CardFooterProps) => (
  <div className={classNames('dqpl-tile-footer', className)} {...other} />
);

CardFooter.displayName = 'CardFooter';

export default CardFooter;

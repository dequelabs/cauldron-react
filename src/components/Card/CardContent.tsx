import React from 'react';
import classNames from 'classnames';

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = ({ className, ...other }: CardContentProps) => (
  <div className={classNames('dqpl-tile-content', className)} {...other} />
);

CardContent.displayName = 'CardContent';

export default CardContent;

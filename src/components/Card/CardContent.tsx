import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = ({ className, ...other }: CardContentProps) => (
  <div className={classNames('dqpl-tile-content', className)} {...other} />
);

CardContent.displayName = 'CardContent';
CardContent.propTypes = {
  className: PropTypes.string
};
export default CardContent;

import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = ({ className, ...other }: CardHeaderProps) => (
  <div className={classNames('dqpl-tile-header', className)} {...other} />
);

CardHeader.displayName = 'CardHeader';
CardHeader.propTypes = {
  className: PropTypes.string
};
export default CardHeader;

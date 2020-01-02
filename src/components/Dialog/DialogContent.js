import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DialogContent = ({ className, ...other }) => (
  <div className={classNames('dqpl-content', className)} {...other} />
);
DialogContent.displayName = 'DialogContent';
DialogContent.propTypes = {
  className: PropTypes.string
};
export default DialogContent;

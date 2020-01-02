import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DialogFooter = ({ className, ...other }) => (
  <div className={classNames('dqpl-modal-footer', className)} {...other} />
);
DialogFooter.displayName = 'DialogFooter';
DialogFooter.propTypes = {
  className: PropTypes.string
};
export default DialogFooter;

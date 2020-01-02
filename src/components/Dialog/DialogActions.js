import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DialogActions = ({ className, ...other }) => (
  <div className={classNames('dqpl-buttons', className)} {...other} />
);
DialogActions.displayName = 'DialogActions';
DialogActions.propTypes = {
  className: PropTypes.string
};
export default DialogActions;

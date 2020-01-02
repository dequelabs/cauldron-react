import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DialogHeading = ({ level, className, ...other }) => {
  const Heading = `h${level}`;
  return (
    <Heading
      tabIndex={-1}
      className={classNames('dqpl-modal-heading', className)}
      {...other}
    />
  );
};

DialogHeading.displayName = 'DialogHeading';
DialogHeading.defaultProps = {
  level: 2
};
DialogHeading.propTypes = {
  level: PropTypes.number,
  className: PropTypes.string
};

export default DialogHeading;

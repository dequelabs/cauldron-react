import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Wrapper / parent component for the <OptionsMenuTrigger /> and <OptionsMenu /> components
 */
const OptionsMenuWrapper = ({ className, ...other }) => (
  <div
    className={classNames('dqpl-options-menu-wrap', className)}
    {...other}
  />
);

OptionsMenuWrapper.propTypes = { className: PropTypes.string };

export default OptionsMenuWrapper;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const menuAlignment = type => {
  switch (type) {
    case 'left':
      return 'dqpl-align-left';
    case 'right':
      return 'dqpl-align-right';
  }
};

/**
 * Wrapper / parent component for the <OptionsMenuTrigger /> and <OptionsMenu /> components
 */
const OptionsMenuWrapper = ({ className, align, ...other }) => (
  <div
    className={classNames(
      'dqpl-options-menu-wrap',
      menuAlignment(align),
      className
    )}
    {...other}
  />
);

OptionsMenuWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  align: PropTypes.oneOf(['left', 'right'])
};

export default OptionsMenuWrapper;

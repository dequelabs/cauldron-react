import React from 'react';
import PropTypes from 'prop-types';

const OptionsMenuItem = React.forwardRef(
  ({ disabled, onSelect, ...other }, ref) => {
    const handleClick = event => {
      if (!disabled) {
        onSelect(event);
      }
    };

    return (
      // keydown happens in OptionsMenu which proxies to click
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <li
        role="menuitem"
        ref={ref}
        aria-disabled={disabled}
        onClick={handleClick}
        {...other}
      />
    );
  }
);

OptionsMenuItem.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onSelect: PropTypes.func
};

export default OptionsMenuItem;

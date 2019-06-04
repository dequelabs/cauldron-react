import React from 'react';
import PropTypes from 'prop-types';

class OptionsMenuItemComponent extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    onSelect: () => {}
  };

  handleClick = event => {
    const { disabled, onSelect } = this.props;
    if (!disabled) {
      onSelect(event);
    }
  };

  render() {
    const { handleClick, props } = this;
    const { menuItemRef, disabled, ...other } = props;
    return (
      // keydown happens in OptionsMenu which proxies to click
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <li
        role="menuitem"
        ref={menuItemRef}
        aria-disabled={disabled}
        onClick={handleClick}
        {...other}
      />
    );
  }
}

export default React.forwardRef(function OptionsMenuItem(props, ref) {
  return <OptionsMenuItemComponent menuItemRef={ref} {...props} />;
});

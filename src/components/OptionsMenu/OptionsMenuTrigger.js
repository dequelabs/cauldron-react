import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * The trigger button component to be used as the default component
 * that triggers the opening of an <OptionsMenu />.
 */
function OptionsMenuTriggerComponent({ className, triggerRef, ...other }) {
  return (
    <button
      type="button"
      ref={triggerRef}
      {...other}
      className={classNames('dqpl-options-menu-trigger', className)}
    />
  );
}

OptionsMenuTriggerComponent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  triggerRef: PropTypes.oneOfType([
    PropTypes.func,
    // avoiding `PropTypes.shape({ current: PropTypes.instanceOf(Element) })`
    // because SSR (we can't rely on any document/window globals at import or render)
    PropTypes.shape({ current: PropTypes.object })
  ])
};

export default React.forwardRef(function OptionsMenuTrigger(props, ref) {
  return <OptionsMenuTriggerComponent {...props} triggerRef={ref} />;
});

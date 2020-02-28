import React from 'react';
import classNames from 'classnames';

export interface OptionsMenuTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  triggerRef?: React.Ref<HTMLButtonElement>;
}

/**
 * The trigger button component to be used as the default component
 * that triggers the opening of an <OptionsMenu />.
 */
function OptionsMenuTriggerComponent({
  className,
  triggerRef,
  ...other
}: OptionsMenuTriggerProps) {
  return (
    <button
      type="button"
      ref={triggerRef}
      {...other}
      className={classNames('dqpl-options-menu-trigger', className)}
    />
  );
}

export default React.forwardRef(function OptionsMenuTrigger(
  props,
  ref: React.Ref<HTMLButtonElement>
) {
  return <OptionsMenuTriggerComponent {...props} triggerRef={ref} />;
});

import * as React from 'react';

/**
 * The options menu item component which should be used
 * as direct children of the <OptionsMenu /> component.
 *
 * NOTE: This is a dummy component in which props are
 * actually set within the <OptionsMenu /> component
 * (See src/lib/components/OptionsMenu/index.js for details)
 */
const OptionsMenuItem = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} />
);
export default OptionsMenuItem;

import React from 'react';
import classNames from 'classnames';
import { OptionsMenuAlignmentProps } from './OptionsMenu';

const menuAlignment = (type: OptionsMenuWrapperProps['align']) => {
  switch (type) {
    case 'left':
      return 'dqpl-align-left';
    case 'right':
      return 'dqpl-align-right';
  }
};

export interface OptionsMenuWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    OptionsMenuAlignmentProps {}

/**
 * Wrapper / parent component for the <OptionsMenuTrigger /> and <OptionsMenu /> components
 */
const OptionsMenuWrapper = ({
  className,
  align,
  ...other
}: OptionsMenuWrapperProps) => (
  <div
    className={classNames(
      'dqpl-options-menu-wrap',
      menuAlignment(align),
      className
    )}
    {...other}
  />
);

export default OptionsMenuWrapper;

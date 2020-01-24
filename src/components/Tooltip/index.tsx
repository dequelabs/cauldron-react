import React from 'react';
import RcTooltip from 'rc-tooltip';

export interface TooltipProps {
  placement: string;
  children: React.ReactNode;
  overlay: React.ReactNode;
  id: string;
}

export default function Tooltip({
  placement,
  children,
  overlay,
  id
}: TooltipProps) {
  return (
    <RcTooltip
      placement={placement}
      trigger={['hover', 'focus']}
      overlay={overlay}
      overlayClassName="dqpl-rc-tooltip"
      id={id}
    >
      {children}
    </RcTooltip>
  );
}

Tooltip.defaultProps = { placement: 'top' };

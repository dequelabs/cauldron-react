import React from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

export interface PanelTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ((props: { open: boolean }) => React.ReactNode) | React.ReactNode;
  open?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function PanelTrigger({
  children,
  className,
  open,
  onClick,
  ...other
}: PanelTriggerProps) {
  return (
    <button
      {...other}
      className={classnames(
        'dqpl-icon dqpl-expand-collapse-trigger',
        className
      )}
      type="button"
      aria-expanded={open}
      onClick={onClick}
    >
      {typeof children === 'function' ? children({ open: !!open }) : children}{' '}
      <Icon type={`fa-chevron-${open ? 'down' : 'right'}`} />
    </button>
  );
}

export default React.memo(PanelTrigger);

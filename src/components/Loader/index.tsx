import React from 'react';
import classNames from 'classnames';

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

export default function Loader({ label, className, ...other }: LoaderProps) {
  const props = {
    ...other,
    className: classNames('dqpl-loader', className),
    'aria-label': label,
    'aria-hidden': label ? false : true
  };
  return <div {...props} />;
}

Loader.displayName = 'Loader';

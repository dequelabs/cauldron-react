import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  type: string; // TODO: replace with a union
}

const Icon = ({ label, type, ...props }: IconProps) => {
  const data: React.HTMLAttributes<HTMLDivElement> = {
    ...props,
    'aria-hidden': label ? 'false' : 'true',
    className: classNames('fa', type, props.className)
  };
  if (label) {
    data['aria-label'] = label;
  }

  return <div {...data} />;
};

Icon.displayName = 'Icon';

Icon.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired
};

export default Icon;

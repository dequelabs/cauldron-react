import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  type: string;
}

const Icon = ({ label, type, ...other }: IconProps) => {
  const props = {
    ...other,
    className: cx('fa', type)
  };

  if (label) {
    props['aria-label'] = label;
    props['aria-hidden'] = false;
  } else {
    props['aria-hidden'] = true;
  }

  return <div {...props} />;
};

Icon.displayName = 'Icon';

Icon.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired
};

export default Icon;

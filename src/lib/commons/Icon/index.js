import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Icon = ({ label, type, ...other }) => {
  const data = {
    ...other,
    'aria-hidden': `${!label}`,
    className: classNames('fa', type)
  };
  if (label) {
    data['aria-label'] = label;
  }

  return <div {...data} />;
};

Icon.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired
};

export default Icon;

import * as React from 'react';
import * as PropTypes from 'prop-types';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

const Loader = ({ label, ...other }: LoaderProps) => (
  <div className="dqpl-loader" aria-label={label} {...other} />
);

Loader.displayName = 'Loader';

Loader.propTypes = {
  label: PropTypes.string.isRequired
};

export default Loader;

import * as React from 'react';
import * as PropTypes from 'prop-types';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

const Loader = ({ label, ...other }: LoaderProps) => (
  <div className="dqpl-loader" {...other} aria-label={label} />
);

Loader.propTypes = {
  label: PropTypes.string.isRequired
};

Loader.displayName = 'Loader';

export default Loader;

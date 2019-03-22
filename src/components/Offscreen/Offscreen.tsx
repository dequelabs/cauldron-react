import * as React from 'react';
import * as PropTypes from 'prop-types';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Offscreen = ({ children, ...props }: Props) => (
  <div className="dqpl-offscreen" {...props}>
    {children}
  </div>
);

Offscreen.displayName = 'Offscreen';

Offscreen.propTypes = { children: PropTypes.node.isRequired };

export default Offscreen;

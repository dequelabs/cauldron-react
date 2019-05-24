import * as React from 'react';

const Offscreen = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="dqpl-offscreen" {...props} />
);

Offscreen.displayName = 'Offscreen';

export default Offscreen;

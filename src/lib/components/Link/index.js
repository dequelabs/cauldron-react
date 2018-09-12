import React from 'react';

export default function Link({ ...other }) {
  return <a className="dqpl-link" {...other} />; // eslint-disable-line jsx-a11y/anchor-has-content
}

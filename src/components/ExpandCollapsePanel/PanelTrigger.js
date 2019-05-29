import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

function PanelTrigger({ children, className, open, onClick, ...other }) {
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
      {typeof children === 'function' ? children({ open }) : children}{' '}
      <Icon type={`fa-chevron-${open ? 'down' : 'right'}`} />
    </button>
  );
}

PanelTrigger.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  open: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default React.memo(PanelTrigger);

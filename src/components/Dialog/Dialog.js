import React, { useEffect, useState, createRef } from 'react';
import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Offscreen from '../Offscreen';
import Scrim from '../Scrim';
import AriaIsolate from '../../utils/aria-isolate';

const Dialog = ({
  show,
  onClose,
  forceAction,
  className,
  closeButtonText,
  children,
  heading,
  alert,
  ...other
}) => {
  const dialog = createRef();
  const [deactivate, setDeactivate] = useState();
  useEffect(
    () => {
      if (show) {
        const isolator = new AriaIsolate(dialog.current);
        setDeactivate(() => isolator.deactivate.bind(isolator));
        isolator.activate();
        return;
      }

      if (!deactivate) {
        return;
      }

      deactivate();
    },
    [show]
  );

  return show ? (
    <FocusTrap
      focusTrapOptions={{
        clickOutsideDeactivates: true,
        onDeactivate: onClose,
        escapeDeactivates: !forceAction,
        initialFocus: alert
          ? '.dqpl-dialog-inner'
          : '.dqpl-dialog-show .dqpl-modal-heading',
        allowOutsideClick: () => false
      }}
    >
      <div
        role={alert ? 'alertdialog' : 'dialog'}
        className={classNames(className, {
          'dqpl-modal': !alert,
          'dqpl-alert': alert,
          'dqpl-dialog-show': show
        })}
        ref={dialog}
        {...other}
      >
        <div className="dqpl-dialog-inner" tabIndex={-1}>
          {alert ? (
            <div className="dqpl-content">{children}</div>
          ) : (
            <>
              <div className="dqpl-modal-header">
                {heading}
                {!forceAction && (
                  <button
                    className="dqpl-close dqpl-icon"
                    type="button"
                    onClick={onClose}
                  >
                    <div className="fa fa-close" aria-hidden="true" />
                    <Offscreen>{closeButtonText}</Offscreen>
                  </button>
                )}
              </div>
              {children}
            </>
          )}
        </div>
      </div>
      <Scrim show={show} />
    </FocusTrap>
  ) : null;
};

Dialog.displayName = 'Dialog';
Dialog.defaultProps = {
  closeButtonText: 'Close'
};
Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  forceAction: PropTypes.bool,
  className: PropTypes.string,
  closeButtonText: PropTypes.string,
  heading: PropTypes.node,
  alert: PropTypes.bool
};

export default Dialog;

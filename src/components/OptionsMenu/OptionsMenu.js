import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OptionsMenuWrapper from './OptionsMenuWrapper';
import OptionsMenuList from './OptionsMenuList';

const [down] = [40];

export default class OptionsMenu extends Component {
  static propTypes = {
    trigger: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func,
    className: PropTypes.string,
    onSelect: PropTypes.func,
    closeOnSelect: PropTypes.bool,
    menuRef: PropTypes.func,
    align: PropTypes.oneOf(['left', 'right'])
  };

  static defaultProps = {
    onClose: () => {},
    onSelect: () => {},
    align: 'right'
  };

  constructor() {
    super();
    this.state = { show: false };
    this.triggerRef = React.createRef();
    this.menuRef = React.createRef();
  }

  toggleMenu = event => {
    this.setState(({ show }) => ({ show: !show }));
    event.preventDefault();
  };

  handleClose = () => {
    this.setState({ show: false });
    this.props.onClose();
    this.triggerRef.current.focus();
  };

  handleTriggerKeyDown = event => {
    const { which, target } = event;
    if (which === down) {
      event.preventDefault();
      target.click();
    }
  };

  render() {
    const { toggleMenu, triggerRef, handleTriggerKeyDown } = this;
    /* eslint-disable no-unused-vars */
    const {
      children,
      className,
      closeOnSelect,
      menuRef,
      trigger,
      align,
      ...other
    } = this.props;

    /* eslint-enable no-unused-vars */
    const { show } = this.state;

    return (
      <OptionsMenuWrapper align={align}>
        {trigger({
          onClick: toggleMenu,
          'aria-expanded': show,
          ref: triggerRef,
          onKeyDown: handleTriggerKeyDown
        })}
        <OptionsMenuList
          show={show}
          ref={el => {
            this.menuRef = el;
            if (menuRef) {
              menuRef(el);
            }
          }}
          onClose={this.handleClose}
          {...other}
        >
          {children}
        </OptionsMenuList>
      </OptionsMenuWrapper>
    );
  }
}

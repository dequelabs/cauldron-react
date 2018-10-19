import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import keyname from 'keyname';

/**
 * The trigger button component to be used as the component
 * that triggers the opening of an <OptionsMenu />.
 *
 * NOTE: This component should be used to set/update the <OptionsMenu /> "show" property
 */
export default class OptionsMenuTrigger extends Component {
  static propTypes = {
    onKeyDown: PropTypes.func,
    onClick: PropTypes.func,
    triggerRef: PropTypes.func,
    className: PropTypes.string
  };

  static defaultProps = {
    onKeyDown: () => {},
    onClick: () => {},
    triggerRef: () => {}
  };

  constructor() {
    super();
    this.state = { expanded: false };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  render() {
    const { expanded } = this.state;
    const { triggerRef, className, ...other } = this.props;

    return (
      <button
        type="button"
        {...other}
        aria-expanded={expanded}
        className={classNames('dqpl-options-menu-trigger', className)}
        ref={triggerRef}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
      />
    );
  }

  onClick(e) {
    this.props.onClick(e);

    this.setState({
      expanded: !this.state.expanded
    });
  }

  onKeyDown(e) {
    this.props.onKeyDown(e);
    const { which, target } = e;
    const key = keyname(which);

    if (key === 'down') {
      e.preventDefault();
      target.click();
    }
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.css';

export default class Checkbox extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string
  }

  static defaultProps = {
    checked: false,
    disabled: false,
    onClick: () => {}
  }

  constructor(props) {
    super(props);
    this.state = { checked: this.props.checked, focused: false };
    this.toggleFocus = this.toggleFocus.bind(this);
    this.onCheckboxClick = this.onCheckboxClick.bind(this);
    this.onOverlayClick = this.onOverlayClick.bind(this);
  }

  toggleFocus() {
    this.setState({ focused: !this.state.focused });
  }

  onCheckboxClick() {
    this.setState({ checked: !this.state.checked });
  }

  onOverlayClick() {
    this.checkbox.click();
    this.checkbox.focus();
  }

  render() {
    const { checked, focused } = this.state;
    const { id, value, name, label, disabled, className, ...others } = this.props;

    return (
      <div className={classNames('dqpl-checkbox-wrap dqpl-flexr', className)} {...others}>
        <input
          type='checkbox'
          checked={checked}
          onChange={this.onCheckboxClick}
          disabled={disabled}
          name={name}
          id={id}
          value={value}
          onFocus={this.toggleFocus}
          onBlur={this.toggleFocus}
          ref={checkbox => this.checkbox = checkbox}
        />
        <div
          aria-hidden='true'
          className={classNames('dqpl-checkbox dqpl-overlay-checkbox fa', {
            'fa-square-o': !checked,
            'fa-check-square': checked,
            'dqpl-checkbox-disabled': disabled,
            'dqpl-checkbox-focused': focused
          })}
          onClick={this.onOverlayClick}
        />
        <label
          className={classNames('dqpl-label', { 'dqpl-label-disabled': disabled })}
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    );
  }
}

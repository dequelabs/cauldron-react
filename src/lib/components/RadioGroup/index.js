import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.css';

export default class RadioGroup extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    radios: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired,
    hasLabel: (props, propName, componentName) => {
      if (!props['aria-label'] && !props['aria-labelledby']) {
        return new Error(`${componentName} must have an "aria-label" or "aria-labelledby" prop`);
      }
    },
    className: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    className: '',
    defaultValue: null,
    onChange: () => {}
  }

  inputs = [];
  handleChange = value => this.setState({ value });
  onRadioFocus = focusIndex => this.setState({ focusIndex });
  onRadioBlur = () => this.setState({ focusIndex: null });
  onRadioClick = i => {
    const radio = this.inputs[i];
    if (!radio) { return; }
    radio.click();
    radio.focus();
  };

  constructor(props) {
    super(props);
    this.state = { value: this.props.defaultValue };
  }

  render() {
    this.inputs = [];
    // disable "no-unused-vars" to prevent `defaultValue` from being passed through to the wrapper
    // eslint-disable-next-line no-unused-vars
    const { name, className, defaultValue, onChange, radios, ...other } = this.props;
    const radioButtons = radios.map((radio, index) => {
      const { label, disabled, value, id, className, ...other } = radio;
      const isChecked = this.state.value === value;
      const isFocused = this.state.focusIndex === index;

      return (
        <div className={classNames('dqpl-radio-wrap dqpl-flexr', className)} key={index}>
          <input
            type='radio'
            name={name}
            value={value}
            id={id}
            ref={input => this.inputs[index] = input}
            onFocus={() => this.onRadioFocus(index)}
            onBlur={() => this.onRadioBlur()}
            onChange={() => {
              this.handleChange(value);
              onChange(radio, this.inputs[index]);
            }}
            disabled={disabled}
            checked={isChecked}
            {...other}
          />
          <div
            aria-hidden='true'
            className={classNames(
              'dqpl-radio dqpl-overlay-radio fa',
              {
                'fa-dot-circle-o': isChecked,
                'fa-circle-o': !isChecked,
                'dqpl-radio-focused': isFocused,
                'dqpl-radio-disabled': disabled
              }
            )}
            onClick={() => this.onRadioClick(index)}
          />
          <label
            htmlFor={id}
            className={classNames('dqpl-label', { 'dqpl-label-disabled': disabled })}
          >
            {label}
          </label>
        </div>
      );
    });

    return (
      <div className={classNames('dqpl-radio-group', className)} role='radiogroup' {...other}>
        {radioButtons}
      </div>
    );
  }
}

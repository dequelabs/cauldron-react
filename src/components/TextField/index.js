import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import rndid from '../../utils/rndid';
import tokenList from '../../utils/token-list';

export default class TextField extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string,
    error: PropTypes.node,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    inputRef: PropTypes.func,
    required: PropTypes.bool,
    requiredText: PropTypes.string, // support localized required text
    'aria-describedby': PropTypes.string
  };

  static defaultProps = {
    error: null,
    required: false,
    defaultValue: null,
    onChange: () => {},
    inputRef: () => {},
    requiredText: 'Required'
  };

  constructor(props) {
    super(props);
    this.inputId = this.props.id || rndid();
    this.errorId = rndid();
    this.state = {
      value:
        typeof this.props.value !== 'undefined'
          ? this.props.value
          : this.props.defaultValue || ''
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;

    if (value === prevProps.value) {
      return;
    }

    this.setState({ value });
  }

  render() {
    const isRequired = !!this.props.required;
    // disabling `no-unused-vars` to prevent specific
    // props from being passed through to the input
    const {
      label,
      inputRef,
      // eslint-disable-next-line no-unused-vars
      value,
      // eslint-disable-next-line no-unused-vars
      onChange,
      // eslint-disable-next-line no-unused-vars
      defaultValue,
      error = null,
      requiredText,
      'aria-describedby': ariaDescribedby,
      ...other
    } = this.props;

    const inputProps = {
      'aria-describedby': error
        ? tokenList(this.errorId, ariaDescribedby)
        : ariaDescribedby
    };

    return (
      <div className="dqpl-field-wrap">
        <label
          className={classNames('dqpl-label', {
            'dqpl-required': isRequired,
            'dqpl-error': error
          })}
          htmlFor={this.inputId}
        >
          <span>{label}</span>
          {isRequired && (
            <span className="dqpl-required-text">{requiredText}</span>
          )}
        </label>
        <input
          className={classNames('dqpl-text-input', {
            'dqpl-error': error
          })}
          id={this.inputId}
          value={this.state.value}
          onChange={this.onChange}
          aria-invalid={!!error}
          ref={input => {
            this.input = input;
            inputRef(input);
          }}
          {...other}
          {...inputProps}
        />
        <div className="dqpl-error-wrap" id={this.errorId}>
          {error}
        </div>
      </div>
    );
  }

  onChange(e) {
    this.props.onChange(this.input.value, e);
    if (typeof this.props.value !== 'undefined') {
      return;
    }

    this.setState({
      value: this.input.value
    });
  }
}

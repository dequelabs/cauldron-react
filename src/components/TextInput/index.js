import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rndid from '../../utils/rndid';

export default class TextInput extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string,
    error: PropTypes.node,
    type: PropTypes.string,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    error: null,
    defaultValue: null,
    value: null,
    onChange: () => {}
  };

  constructor(props) {
    super(props);
    this.inputId = props.id || rndid();
  }

  render() {
    const { label } = this.props;

    return (
      <div className="dqpl-field-wrap">
        <label className="dqpl-label" htmlFor={this.inputId}>
          {label}
        </label>
        <input className="dqpl-text-input" id={this.inputId} />
      </div>
    );
  }
}

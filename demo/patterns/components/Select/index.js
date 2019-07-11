import React, { Component } from 'react';
import Highlight from '../../../Highlight';
import { Select, Button } from 'src/';
import './index.css';

export default class Demo extends Component {
  constructor() {
    super();
    this.state = {
      value: 'Monday',
      current: 'Monday',
      options: [
        { value: 'Monday' },
        { value: 'Tuesday' },
        { value: 'Wednesday' },
        { value: 'Thursday' },
        { value: 'Friday' },
        { value: 'Saturday', disabled: true },
        { value: 'Sunday' }
      ]
    };
    this.onClick = this.onClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onClick() {
    this.setState({ value: 'Sunday' });
  }

  onSelect(option) {
    this.setState({
      current: option.value,
      value: null
    });
  }

  render() {
    return (
      <div className="select-demo">
        <h1>Select</h1>
        <h2>Demo</h2>
        <div>
          <Select
            label="Day"
            value={this.state.value}
            onSelect={this.onSelect}
            options={this.state.options}
          />
          <p>
            <span>
              To programmatically select an option, simply update the{' '}
            </span>
            <code>value</code>
            <span> prop.</span>
          </p>
          <Button
            className="select-demo-button"
            variant="secondary"
            onClick={this.onClick}
          >
            Select Sunday
          </Button>
          <p>
            <span>Using the </span>
            <code>onSelect</code>
            <span> prop, we can easily handle changes in the select list</span>
          </p>
          <div className="current-value">
            <strong>Current value: </strong>
            <span>{this.state.current}</span>
          </div>
        </div>
        <h2>Code Sample</h2>
        <Highlight language="javascript">
          {`
    import React from 'react';
    import { Select, SelectOption } from 'cauldron-react';

    const Demo = () => (
      <Select
        label='Day'
        value='Monday'
        selectedId='day-selected'
        listId='day-list'
        onSelect={(selected) => console.log('Selected: ', selected)}
        options={[
          { label: 'Monday' },
          { label: 'Tuesday' },
          { label: 'Wednesday' },
          { label: 'Thursday' },
          { label: 'Friday' },
          { label: 'Saturday', disabled: true },
          { label: 'Sunday' }
        ]}
      />
    );
          `}
        </Highlight>
      </div>
    );
  }
}

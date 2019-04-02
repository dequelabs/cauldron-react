import React, { Component } from 'react';
import Highlight from '../../../Highlight';
import { TextField, Button } from 'src/';
import './index.css';

export default class Demo extends Component {
  state = {
    error: null
  };

  validate = e => {
    e.preventDefault();
    const isEmpty = !this.input.value.trim();
    this.setState({
      error: isEmpty ? 'Name must not be blank.' : null
    });

    if (isEmpty) {
      this.input.focus();
    }
  };

  render() {
    return (
      <div className="TextField">
        <h1>TextField</h1>
        <p>
          The TextField component can be controlled (using the <em>value</em>{' '}
          and <em>onChange</em> props) or uncontrolled (like traditional HTML
          inputs).
        </p>
        <h2>Demo</h2>
        <form onSubmit={this.validate} noValidate>
          <p id="text-field-help">
            <em>Hint:</em> submit with the field blank to trigger error!
          </p>
          <TextField
            required
            id="name"
            label="Name"
            aria-describedby="text-field-help"
            error={this.state.error}
            inputRef={el => (this.input = el)}
          />
          <Button type="submit">Submit</Button>
        </form>
        <h2>Code Sample</h2>
        <Highlight language="javascript">
          {`
import React from 'react';
import {
  TextField, Button
} from 'cauldron-react';

const Demo = () => (
  <form onSubmit={this.validate} noValidate>
    <p id="text-field-help"><em>Hint:</em> submit with the field blank to trigger error!</p>
    <TextField
      required
      id="name"
      label="Name"
      aria-describedby="text-field-help"
      error={this.state.error}
      inputRef={el => this.input = el}
    />
    <Button type="submit">Submit</Button>
  </form>
);
      `}
        </Highlight>
      </div>
    );
  }
}

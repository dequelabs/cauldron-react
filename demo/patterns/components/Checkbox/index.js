import React, { Component } from 'react';
import Highlight from 'demo/Highlight';
import { Checkbox, Button } from 'src/';
import './index.css';

export default class Demo extends Component {
  state = {
    mangoChecked: false
  };

  onMangoToggle = () => {
    const { mangoChecked } = this.state;
    this.setState({
      mangoChecked: !mangoChecked
    });
  };

  handleMangoChange = (e, mangoChecked) => {
    this.setState({ mangoChecked });
  };

  render() {
    return (
      <div>
        <h1>Checkbox</h1>
        <h2>Demo</h2>
        <h3 id="foods-label">Choose your favorite foods</h3>
        <div role="group" aria-labelledby="foods-label">
          <Checkbox
            checked
            id="artichokes"
            name="foods"
            value="artichokes"
            label="Artichokes"
          />
          <Checkbox
            disabled
            id="liver"
            name="foods"
            value="liver"
            label="Liver"
          />
          <Checkbox
            id="mangos"
            name="foods"
            value="mangos"
            label="Mangos"
            checked={this.state.mangoChecked}
            onChange={this.handleMangoChange}
          />
          <Checkbox id="falafel" name="foods" value="falafel" label="Falafel" />
        </div>
        <p>
          checked prop value changes will be picked up so you can
          programmatically control the checked state of a checkbox.
        </p>
        <Button className="mango-toggler" onClick={this.onMangoToggle}>
          Toggle mangos checked
        </Button>
        <h2>Code Sample</h2>
        <Highlight language="javascript">
          {`
  import React, { Component } from 'react';
  import { Checkbox, Button } from 'cauldron-react';

  class Demo extends Component {
    state = { mangoChecked: false };

    onMangoToggle = () => {
      const { mangoChecked } = this.state;
      this.setState({
        mangoChecked: !mangoChecked
      });
    };

    handleMangoChange = (e, mangoChecked) => {
      this.setState({ mangoChecked });
    };

    render() {
      return (
        <h3 id="foods-label">Choose your favorite foods</h3>
        <div role="group" aria-labelledby="foods-label">
          <Checkbox
            checked
            id="artichokes"
            name="foods"
            value="artichokes"
            label="Artichokes"
            checkboxRef={checkbox => this.artichokeBox = checkbox}
          />
          <Checkbox
            disabled
            id="liver"
            name="foods"
            value="liver"
            label="Liver"
          />
          <Checkbox
            id="mangos"
            name="foods"
            value="mangos"
            label="Mangos"
            checked={this.state.mangoChecked}
            onChange={this.handleMangoChange}
          />
          <Checkbox id="falafel" name="foods" value="falafel" label="Falafel" />
        </div>
        <Button className="mango-toggler" onClick={this.onMangoToggle}>
          Toggle mangos checked
        </Button>
      );
    }
  }
      `}
        </Highlight>
      </div>
    );
  }
}

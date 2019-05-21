import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highlight from '../Highlight';
import './index.css';

const stateToPropString = state => {
  const props = [];
  for (const propName in state) {
    if (!state.hasOwnProperty(propName) || propName === 'children') {
      continue;
    }
    const val = state[propName];
    let prop = `${propName}=`;
    if (typeof val === 'string') {
      prop += `"${val}"`;
    } else if (typeof val === 'number') {
      prop += `{${val}}`;
    } else {
      // Hope for the best...
      prop += `{${JSON.stringify(val)}}`;
    }
    props.push(prop);
  }
  return props.join(' ');
};

class Demo extends Component {
  static propTypes = {
    propDocs: PropTypes.object.isRequired,
    states: PropTypes.arrayOf(PropTypes.object).isRequired,
    component: PropTypes.func.isRequired,
    children: PropTypes.node
  };

  render() {
    const { states, component: Component, propDocs, children } = this.props;
    const { displayName } = Component;
    // TODO: come up with clean way to render code snippet of children
    // For now it can be manual (as in if you pass children to this thing,
    // then you have to provide some <Highlighted /> snippet(s) as well)
    return (
      <div className="Demo">
        <h1>{displayName}</h1>
        <div className="Demo-states">
          <h2>Examples</h2>
          {states.map(state => (
            <div key={JSON.stringify(state)}>
              <Component {...state} />
              <Highlight>{this.renderState(state)}</Highlight>
            </div>
          ))}
          {children}
        </div>
        <div className="Demo-props">
          <h2>Props</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Required</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(propDocs).map(([name, data]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{data.type}</td>
                  <td>{`${!!data.required}`}</td>
                  <td>{data.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderState = state => {
    const { displayName } = this.props.component;

    if (!displayName) {
      throw new Error('Component missing displayName');
    }

    const { children } = state;

    // Only prop is children.
    if (children && Object.keys(state).length === 1) {
      return `<${displayName}>\n  ${children}\n</${displayName}>`;
    }

    const props = stateToPropString(state);

    // No props.
    if (!props) {
      return `<${displayName} />`;
    }

    // Props without children.
    if (!children) {
      return `<${displayName} ${props} />`;
    }

    // Props and children.
    return `<${displayName} ${props}>\n  ${children}\n</${displayName}>`;
  };
}

export default Demo;

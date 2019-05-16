import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highlight from '../Highlight';
import './index.css';

const commonProps = {
  children: {
    type: 'node',
    description: 'The child content'
  },
  className: {
    type: 'string',
    description: 'Class name string'
  }
};

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
    // TODO: Figure out how to utilize Component.propTypes to auto-document it
    // which would make it so all you have to do is provide a string description
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
              {Object.entries(propDocs).map(([name, data]) => {
                data = typeof data === 'boolean' ? commonProps[name] : data;
                return (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{data.type}</td>
                    <td>{`${!!data.required}`}</td>
                    <td>{data.description}</td>
                  </tr>
                );
              })}
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

    const props = stateToPropString(state);

    // No props.
    if (!props) {
      return `<${displayName} />`;
    }

    // Props without children.
    if (!state.children) {
      return `<${displayName} ${props} />`;
    }

    const { children } = state;

    // Only prop is children.
    if (children && Object.keys(state).length === 1) {
      return `<${displayName}>\n  ${children}\n</${displayName}>`;
    }

    // Props and children.
    return `<${displayName} ${props}>\n  ${children}\n</${displayName}>`;
  };
}

export default Demo;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jsxStringify from 'react-element-to-jsx-string';
import Highlight from '../Highlight';
import './index.css';

class Demo extends Component {
  static propTypes = {
    propDocs: PropTypes.object.isRequired,
    states: PropTypes.arrayOf(PropTypes.object).isRequired,
    component: PropTypes.func.isRequired,
    children: PropTypes.node
  };

  render() {
    const { states, component: Component, propDocs, children } = this.props;
    const { displayName, defaultProps = {} } = Component;

    return (
      <div className="Demo">
        <h1>{displayName}</h1>
        <div className="Demo-states">
          <h2>Examples</h2>
          {/* setting children to null in the key to avoid stringify choking on potential jsx children */}
          {states.map(state => (
            <div key={JSON.stringify({ ...state, children: null })}>
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
                <th>Default</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(propDocs).map(([name, data]) => {
                const defaultProp = defaultProps[name];

                return (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{data.type}</td>
                    <td>{`${!!data.required}`}</td>
                    <td>{data.description}</td>
                    <td>
                      {defaultProp &&
                        (typeof defaultProp === 'object'
                          ? JSON.stringify(defaultProp)
                          : `${defaultProp}`)}
                    </td>
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

    const Tag = displayName;
    return jsxStringify(<Tag {...state} />, {
      showDefaultProps: false
    });
  };
}

export default Demo;

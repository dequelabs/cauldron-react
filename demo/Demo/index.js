import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jsxStringify from 'react-element-to-jsx-string';
import Highlight from '../Highlight';
import './index.css';

const stringifyConfig = {
  showDefaultProps: false,
  showFunctions: true
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
    const { displayName, defaultProps = {} } = Component;

    return (
      <div className="Demo">
        <h1>{displayName}</h1>
        {states.length ? (
          <div className="Demo-states">
            <h2>Examples</h2>
            {/* setting children to null in the key to avoid stringify choking on potential jsx children */}
            {states.map(state => {
              const { renderAfter, ...thinState } = state;
              const componentMarkup = this.renderState(thinState);
              const afterMarkup =
                renderAfter && jsxStringify(renderAfter, stringifyConfig);

              return (
                <div key={componentMarkup}>
                  <Component {...thinState} />
                  {renderAfter}
                  <Highlight>
                    {`${componentMarkup}${
                      afterMarkup ? `\n${afterMarkup}` : ''
                    }`}
                  </Highlight>
                </div>
              );
            })}
            {children}
          </div>
        ) : (
          children
        )}
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
    return jsxStringify(<Tag {...state} />, stringifyConfig);
  };
}

export default Demo;

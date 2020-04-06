import React from 'react';
import PropTypes from 'prop-types';
import { mount, shallow } from 'enzyme';
import Demo from '../../../demo/Demo';

const Dummy = ({ children, foo }) => (
  <div className={foo ? 'foo' : 'bar'}>{children}</div>
);
Dummy.propTypes = {
  children: PropTypes.node.isRequired,
  foo: PropTypes.bool
};
Dummy.displayName = 'Dummy';

const defaultProps = {
  states: [
    { children: 'hi', foo: true },
    { children: 'hi', foo: false }
  ],
  component: Dummy,
  propDocs: {
    children: {
      type: 'node',
      description: 'child content'
    },
    foo: {
      type: 'boolean',
      description: 'whether or not to foo'
    }
  }
};

test('renders the examples based on props.states', () => {
  const demo = mount(<Demo {...defaultProps} />);
  expect(demo.find('.foo').length).toBe(1);
  expect(demo.find('.bar').length).toBe(1);
  expect(demo.find('Code').length).toBe(
    // adding 1 here to account for the "import {x } from 'cauldron-react'" code block
    Object.keys(defaultProps.propDocs).length + 1
  );
});

test('throws if no displayName is passed', () => {
  const NoName = () => null;
  const props = {
    component: NoName,
    states: [{}],
    propDocs: {}
  };
  expect(() => {
    shallow(<Demo {...props} />);
  }).toThrowError('displayName');
});

test('renders the propDocs table', () => {
  const demo = mount(<Demo {...defaultProps} />);
  expect(demo.find('table').length).toBe(1);
  expect(demo.find('table tbody tr').length).toBe(
    Object.keys(defaultProps.propDocs).length
  );
});

test('handles state.DEMO_renderAfter/DEMO_renderBefore', () => {
  const props = {
    ...defaultProps,
    states: [
      {
        children: 'hi',
        foo: true,
        DEMO_renderBefore: <button id="baz" />,
        DEMO_renderAfter: <button id="bar" />
      }
    ]
  };
  const demo = mount(<Demo {...props} />);
  expect(demo.find('.foo').getDOMNode().previousElementSibling.id).toBe('baz');
  expect(demo.find('.foo').getDOMNode().nextElementSibling.id).toBe('bar');
});

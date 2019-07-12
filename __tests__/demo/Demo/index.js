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
  states: [{ children: 'hi', foo: true }, { children: 'hi', foo: false }],
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
  expect(demo.find('Highlight').length).toBe(
    Object.keys(defaultProps.propDocs).length
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

import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import a11yHighlight from './a11y-highlight';

const Highlight = ({ children, ...other }) => (
  <SyntaxHighlighter {...other} style={a11yHighlight}>{children}</SyntaxHighlighter>
);

Highlight.propTypes = {
  children: PropTypes.string.isRequired
};

export default Highlight;

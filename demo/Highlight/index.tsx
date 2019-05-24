import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import a11yHighlight from './a11y-highlight';

// Enable "spreading" props to the SyntaxHighlighter component.
interface SyntaxHighlighterProps {
  [p: string]: any;
}

interface HighlightProps extends SyntaxHighlighterProps {
  children: React.ReactNode;
}

const Highlight = ({ children, ...other }: HighlightProps) => (
  <SyntaxHighlighter {...other} style={a11yHighlight}>
    {children}
  </SyntaxHighlighter>
);

export default Highlight;

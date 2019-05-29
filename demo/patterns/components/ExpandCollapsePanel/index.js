import React, { Component } from 'react';
import Highlight from '../../../Highlight';
import { ExpandCollapsePanel, PanelTrigger } from 'src/';

export default class Demo extends Component {
  render() {
    return (
      <div>
        <h1>Expand Collapse Panel</h1>
        <h2>Demo</h2>
        <ExpandCollapsePanel>
          <PanelTrigger>More bacon info</PanelTrigger>
          Bacon ipsum dolor amet chicken frankfurter shoulder strip steak
          kielbasa ribeye ham hamburger. Fatback kielbasa shoulder, jowl buffalo
          bacon jerky ham pancetta. Strip steak pig chicken, spare ribs buffalo
          beef tail ground round. Pancetta kevin strip steak bacon beef corned
          beef venison.
        </ExpandCollapsePanel>
        <h2>Code Sample</h2>
        <Highlight language="javascript">{`
import React from 'react';
import { ExpandCollapsePanel, PanelTrigger } from 'react-cauldron';

const Demo = () => {
  <ExpandCollapsePanel>
    <PanelTrigger>
      More bacon info
    </PanelTrigger>
    Bacon ipsum dolor amet chicken frankfurter shoulder strip steak
    kielbasa ribeye ham hamburger. Fatback kielbasa shoulder, jowl buffalo
    bacon jerky ham pancetta. Strip steak pig chicken, spare ribs buffalo
    beef tail ground round. Pancetta kevin strip steak bacon beef corned
    beef venison.
  </ExpandCollapsePanel>
};
        `}</Highlight>
      </div>
    );
  }
}

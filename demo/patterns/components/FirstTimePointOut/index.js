import React, { useState, useEffect } from 'react';
import Highlight from '../../../Highlight';
import { FirstTimePointOut } from 'src/';

const Demo = () => {
  const buttonRef = React.createRef();
  const ftpoRef = React.createRef();

  const [portal, setPortal] = useState(null);
  useEffect(() => {
    setPortal(document.querySelector('.dqpl-layout'));
  });

  const [position, setPosition] = useState(0);
  function togglePosition() {
    setPosition(position ? 0 : 50);
    ftpoRef.current.forceUpdate();
  }

  return (
    <div>
      <h1>First Time Point Out</h1>
      <h2>Demo</h2>

      <h3>With Default Arrow</h3>
      <FirstTimePointOut headerId="ftpo-head-pointer" dismissText="Close">
        <h4 id="ftpo-head-pointer">First time point out!</h4>
        <p>This is a first time point out with a pointer</p>
      </FirstTimePointOut>
      <Highlight language="javascript">
        {`<FirstTimePointOut headerId="ftpo-head-pointer" dismissText="Close">
  <h4 id="ftpo-head-pointer">First time point out!</h4>
  <p>This is a first time point out with a pointer</p>
</FirstTimePointOut>`}
      </Highlight>

      <h3>With Positioned Arrow</h3>
      <FirstTimePointOut
        headerId="ftpo-head-positioned"
        dismissText="Close"
        arrowPosition="top-right"
      >
        <h4 id="ftpo-head-positioned">First time point out!</h4>
        <p>This is a first time point out with a positioned pointer</p>
      </FirstTimePointOut>
      <Highlight language="javascript">
        {`<FirstTimePointOut headerId="ftpo-head-positioned" dismissText="Close" arrowPosition="top-right>
  <h4 id="ftpo-head-positioned">First time point out!</h4>
  <p>This is a first time point out with a positioned pointer</p>
</FirstTimePointOut>`}
      </Highlight>

      <h3>Without Arrow</h3>
      <FirstTimePointOut headerId="ftpo-head-no-arrow" noArrow={true}>
        <h4 id="ftpo-head-no-arrow">First time point out!</h4>
        <p>This is a first time point out without a pointer</p>
      </FirstTimePointOut>
      <Highlight language="javascript">
        {`<FirstTimePointOut headerId="ftpo-head-no-arrow" noArrow={true}>
  <h4 id="ftpo-head-no-arrow">First time point out!</h4>
  <p>This is a first time point out without a pointer</p>
</FirstTimePointOut>`}
      </Highlight>

      <h3>Targeted First Time Point Outs</h3>
      <p>
        First time point outs can specify a <code>target</code> prop that will
        dynamically position itself pointing to the target element on render.
        Under the hood, we are using{' '}
        <a href="https://reactjs.org/docs/portals.html">Portals</a> to render
        the element to <code>document.body</code> but you can customize the
        portal location by setting the <code>portal</code> prop with your own
        element or ref.
      </p>
      <p>
        Positioning tracks <code>window.resize</code> events so that the First
        Time Point Out should always be positioned correctly no matter the
        context. If your component has a side effect where a target
        {"'"}s position is changed that does not cause a trigger a resize, you
        can call <code>forceUpdate()</code> on the First Time Point out to reset
        the positioning.
      </p>

      <button
        style={{ marginLeft: `${position}%`, marginBottom: '171px' }}
        ref={buttonRef}
        type="button"
        className="dqpl-button-primary"
        onClick={togglePosition}
      >
        Change My Position
      </button>
      <FirstTimePointOut
        ref={ftpoRef}
        headerId="ftpo-head"
        dismissText="Close"
        target={buttonRef}
        portal={portal}
      >
        <h4 id="ftpo-head">Targeted FTPO</h4>
        <p>This is a first time point out pointing to an element target.</p>
      </FirstTimePointOut>
      <Highlight language="javascript">
        {`function TargetedFTPO() {
  const buttonRef = React.createRef();
  return (
    <div>
      <button type="button" ref={buttonRef}>Button</button>
      <FirstTimePointOut headerId="ftpo-targeted" dismissText="Close" target={buttonRef}>
        <h4 id="ftpo-targeted">Targeted FTPO</h4>
        <p>This is a first time point out pointing to an element target.</p>
      </FirstTimePointOut>
    </div>
  );
}`}
      </Highlight>
    </div>
  );
};

export default Demo;

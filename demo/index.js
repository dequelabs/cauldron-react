import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

// import demo views
import Home from './Home';
import Button from './patterns/components/Button';
import FirstTimePointOut from './patterns/components/FirstTimePointOut';
import Alert from './patterns/composites/Alert';
import Modal from './patterns/composites/Modal';

// import cauldron react components
import {
  TopBar,
  TopBarItem,
  Workspace,
  TopBarTrigger,
  SideBar,
  SideBarItem,
  Offscreen,
  Icon,
  SkipLink
} from '../';

// styles
import '../node_modules/deque-pattern-library/dist/css/pattern-library.min.css';
import './index.less';

const app = (
  <Router>
    <div>
      <SkipLink target={'#main-content'} />
      <TopBar>
        <TopBarTrigger index={0} />
        <TopBarItem index={1}>
          <Link tabIndex={-1} to='/'>{'Cauldron React'}</Link>
        </TopBarItem>
        <TopBarItem index={2} className='dqpl-right-aligned'>
          <a
            href={'https://github.com/dequelabs/pattern-library/wiki'}
            target={'_blank'}
            tabIndex={-1}
          >
            <Offscreen>{'React Cauldron Help (opens in a new tab)'}</Offscreen>
            <Icon type={'fa-question-circle'} />
          </a>
        </TopBarItem>
      </TopBar>
      <SideBar>
        <SideBarItem index={0}>
          <Link tabIndex={-1} to='/components/button'>{'Button'}</Link>
        </SideBarItem>
        <SideBarItem index={1}>
          <Link tabIndex={-1} to='/components/first-time-point-out'>{'First time point out'}</Link>
        </SideBarItem>
        <SideBarItem index={2}>
          <Link tabIndex={-1} to='/composites/alert'>{'Alert'}</Link>
        </SideBarItem>
        <SideBarItem index={3}>
          <Link tabIndex={-1} to='/composites/modal'>{'Modal'}</Link>
        </SideBarItem>
      </SideBar>
      <Workspace id='main-content'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/components/button' component={Button} />
          <Route exact path='/components/first-time-point-out' component={FirstTimePointOut} />
          <Route exact path='/composites/alert' component={Alert} />
          <Route exact path='/composites/modal' component={Modal} />
        </Switch>
      </Workspace>
    </div>
  </Router>
);

render(app, document.getElementById('root'));
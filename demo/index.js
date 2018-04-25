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
import Toast from './patterns/components/Toast';
import Alert from './patterns/composites/Alert';
import Modal from './patterns/composites/Modal';
import Loader from './patterns/components/Loader';
import OptionsMenu from './patterns/components/OptionsMenu';
import Select from './patterns/components/Select';
import RadioGroup from './patterns/components/RadioGroup';

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
} from 'src/';

// styles
import '../node_modules/deque-pattern-library/dist/css/pattern-library.min.css';
import './index.css';

const app = (
  <Router>
    <div>
      <SkipLink target={'#main-content'} />
      <TopBar>
        <TopBarTrigger index={0} />
        <TopBarItem index={1}>
          <Link tabIndex={-1} to='/'>Cauldron React</Link>
        </TopBarItem>
        <TopBarItem index={2} className='dqpl-right-aligned'>
          <a
            href={'https://github.com/dequelabs/pattern-library/wiki'}
            target={'_blank'}
            tabIndex={-1}
          >
            <Offscreen>React Cauldron Help (opens in a new tab)</Offscreen>
            <Icon type={'fa-question-circle'} />
          </a>
        </TopBarItem>
      </TopBar>
      <SideBar>
        <SideBarItem index={0}>
          <Link tabIndex={-1} to='/components/button'>Button</Link>
        </SideBarItem>
        <SideBarItem index={1}>
          <Link tabIndex={-1} to='/components/first-time-point-out'>
            First time point out
          </Link>
        </SideBarItem>
        <SideBarItem index={2}>
          <Link tabIndex={-1} to='/composites/alert'>Alert</Link>
        </SideBarItem>
        <SideBarItem index={3}>
          <Link tabIndex={-1} to='/composites/modal'>Modal</Link>
        </SideBarItem>
        <SideBarItem index={4}>
          <Link tabIndex={-1} to='/components/toast'>Toast</Link>
        </SideBarItem>
        <SideBarItem index={5}>
          <Link tabIndex={-1} to='/components/loader'>Loader</Link>
        </SideBarItem>
        <SideBarItem index={6}>
          <Link tabIndex={-1} to='/components/options-menu'>Options Menu</Link>
        </SideBarItem>
        <SideBarItem index={7}>
          <Link tabIndex={-1} to='/components/select'>Select</Link>
        </SideBarItem>
        <SideBarItem index={8}>
          <Link tabIndex={-1} to='/components/radio-group'>Radio Group</Link>
        </SideBarItem>
      </SideBar>
      <Workspace id='main-content'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/components/button' component={Button} />
          <Route exact path='/components/first-time-point-out' component={FirstTimePointOut} />
          <Route exact path='/components/toast' component={Toast} />
          <Route exact path='/components/loader' component={Loader} />
          <Route exact path='/components/options-menu' component={OptionsMenu} />
          <Route exact path='/composites/alert' component={Alert} />
          <Route exact path='/composites/modal' component={Modal} />
          <Route exact path='/components/select' component={Select} />
          <Route exact path='/components/radio-group' component={RadioGroup} />
        </Switch>
      </Workspace>
    </div>
  </Router>
);

render(app, document.getElementById('root'));

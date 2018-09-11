import React, { Component } from 'react';
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
import Checkbox from './patterns/components/Checkbox';

// import cauldron react components
import {
  TopBar,
  Workspace,
  TopBarTrigger,
  SideBar,
  SkipLink,
  MenuItem
} from 'src/';

// styles
import '../node_modules/deque-pattern-library/dist/css/pattern-library.min.css';
import './index.css';

class App extends Component {
  state = { show: false }
  constructor() {
    super();
    this.onTriggerClick = this.onTriggerClick.bind(this);
  }

  onTriggerClick() {
    const { show } = this.state;

    if (show && this.topBarTrigger) {
      this.topBarTrigger.focus();
    }

    this.setState({ show: !show });
  }

  renderSideBarLink(to, text) {
    return (
      <Link
        to={to}
        onClick={() => {
          this.setState({ show: false });
          this.workspace.focus();
        }}
        tabIndex={-1}
      >
        {text}
      </Link>
    );
  }

  render() {
    return (
      <Router>
        <div>
          <SkipLink target={'#main-content'} />
          <TopBar hasTrigger={true}>
            <TopBarTrigger
              onClick={this.onTriggerClick}
              menuItemRef={el => this.topBarTrigger = el}
            />
            <MenuItem>
              <Link tabIndex={-1} to='/'>Cauldron</Link>
            </MenuItem>
            <MenuItem className='dqpl-right-aligned'>
              <a
                tabIndex={-1}
                href='https://github.com/dequelabs/cauldron-react'
                className='fa fa-github'
                aria-label='Cauldron React on GitHub'
              />
            </MenuItem>
          </TopBar>
          <SideBar show={this.state.show} onDismiss={this.onTriggerClick}>
            <MenuItem>
              {this.renderSideBarLink('/components/button', 'Button')}
            </MenuItem>
            <MenuItem>
              {this.renderSideBarLink('/components/first-time-point-out', 'First time point out')}
            </MenuItem>
            <MenuItem>
              {this.renderSideBarLink('/composites/alert', 'Alert')}
            </MenuItem>
            <MenuItem>
              {this.renderSideBarLink('/composites/modal', 'Modal')}
            </MenuItem>
            <MenuItem>
              {this.renderSideBarLink('/components/toast', 'Toast')}
            </MenuItem>
            <MenuItem>
              {this.renderSideBarLink('/components/loader', 'Loader')}
            </MenuItem>
            <MenuItem>
              {this.renderSideBarLink('/components/options-menu', 'Options Menu')}
            </MenuItem>
            <MenuItem>
              {this.renderSideBarLink('/components/select', 'Select')}
            </MenuItem>
            <MenuItem>
              {this.renderSideBarLink('/components/radio-group', 'Radio Group')}
            </MenuItem>
            <MenuItem>
              {this.renderSideBarLink('/components/checkbox', 'Checkbox')}
            </MenuItem>
          </SideBar>
          <Workspace
            id='main-content'
            workspaceRef={el => this.workspace = el}
            tabIndex={-1}
          >
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
              <Route exact path='/components/checkbox' component={Checkbox} />
            </Switch>
          </Workspace>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById('root'));

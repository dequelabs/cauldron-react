import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// import demo views
import Home from './Home';
import Layout from './Layout';
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
import Tooltip from './patterns/components/Tooltip';
import Card from './patterns/components/Card';
import TextField from './patterns/components/TextField';
import ClickOutsideListener from './patterns/components/ClickOutsideListener';
import ExpandCollapsePanel from './patterns/components/ExpandCollapsePanel';

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
import '../src/index.css';
import './index.css';

class App extends Component {
  state = { show: false };
  constructor() {
    super();
    this.onTriggerClick = this.onTriggerClick.bind(this);
  }

  onTriggerClick(e) {
    const { show } = this.state;

    if (e) {
      e.preventDefault();
    }

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
    /* eslint-disable jsx-a11y/anchor-has-content */
    return (
      <Router>
        <div>
          <SkipLink target={'#main-content'} />
          <TopBar hasTrigger={true}>
            <TopBarTrigger
              onClick={this.onTriggerClick}
              menuItemRef={el => (this.topBarTrigger = el)}
            />
            <MenuItem>
              <Link tabIndex={-1} to="/">
                Cauldron
              </Link>
            </MenuItem>

            {/* The below line demonstrates the ability to conditionally include menu item children. */}
            {false && <MenuItem>Potato</MenuItem>}

            <MenuItem className="dqpl-right-aligned">
              <a
                tabIndex={-1}
                href="https://github.com/dequelabs/cauldron-react"
                className="fa fa-github"
                aria-label="Cauldron React on GitHub"
              />
            </MenuItem>
          </TopBar>
          <SideBar show={this.state.show} onDismiss={this.onTriggerClick}>
            <MenuItem>{this.renderSideBarLink('/layout', 'Layout')}</MenuItem>
            <MenuItem>
              {this.renderSideBarLink('/components/button', 'Button')}
            </MenuItem>
            <MenuItem>
              {this.renderSideBarLink(
                '/components/first-time-point-out',
                'First time point out'
              )}
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
              {this.renderSideBarLink(
                '/components/options-menu',
                'Options Menu'
              )}
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
            <MenuItem>
              {this.renderSideBarLink(
                '/components/clickoutside',
                'Click Outside Listener'
              )}
            </MenuItem>
            <MenuItem>
              {this.renderSideBarLink('/components/tooltip', 'Tooltip')}
            </MenuItem>
            <MenuItem>
              {this.renderSideBarLink('/components/card', 'Card')}
            </MenuItem>
            <MenuItem>
              {this.renderSideBarLink(
                '/components/expand-collapse-panel',
                'Expand/Collapse Panel'
              )}
            </MenuItem>
            <MenuItem>
              {this.renderSideBarLink('/components/text-field', 'TextField')}
            </MenuItem>
          </SideBar>
          <Workspace
            id="main-content"
            workspaceRef={el => (this.workspace = el)}
            tabIndex={-1}
          >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/layout" component={Layout} />
              <Route exact path="/components/button" component={Button} />
              <Route
                exact
                path="/components/first-time-point-out"
                component={FirstTimePointOut}
              />
              <Route exact path="/components/toast" component={Toast} />
              <Route exact path="/components/loader" component={Loader} />
              <Route
                exact
                path="/components/options-menu"
                component={OptionsMenu}
              />
              <Route exact path="/composites/alert" component={Alert} />
              <Route exact path="/composites/modal" component={Modal} />
              <Route exact path="/components/select" component={Select} />
              <Route
                exact
                path="/components/radio-group"
                component={RadioGroup}
              />
              <Route exact path="/components/checkbox" component={Checkbox} />
              <Route
                exact
                path="/components/clickoutside"
                component={ClickOutsideListener}
              />
              <Route exact path="/components/tooltip" component={Tooltip} />
              <Route exact path="/components/card" component={Card} />
              <Route
                exact
                path="/components/expand-collapse-panel"
                component={ExpandCollapsePanel}
              />
              <Route
                exact
                path="/components/text-field"
                component={TextField}
              />
            </Switch>
          </Workspace>
        </div>
      </Router>
    );
    /* eslint-enable jsx-a11y/anchor-has-content */
  }
}

render(<App />, document.getElementById('root'));

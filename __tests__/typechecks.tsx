import * as React from 'react';

import {
  Alert,
  AlertActions,
  Button,
  Checkbox,
  FirstTimePointOut,
  Icon,
  Link,
  Loader,
  MenuItem,
  Modal,
  ModalContent,
  ModalFooter,
  Offscreen,
  OptionsMenu,
  OptionsMenuItem,
  OptionsMenuTrigger,
  OptionsMenuWrapper,
  RadioGroup,
  Scrim,
  Select,
  Sidebar,
  SkipLink,
  Toast,
  TopBar,
  TopBarTrigger,
  Workspace,
  AriaIsolate,
  focusableSelector,
  TextField,
  ClickOutsideListener,
  ExpandCollapsePanel,
  PanelTrigger
} from '../types';

const noop = () => {};
const noopEventHandler = (e: any) => {};
const noopRef = (ref: any) => {};

const alert = () => (
  <Alert
    alertRef={noopRef}
    className="hello"
    contentRef={noopRef}
    show={false}
    forceAction={true}
  >
    Hello!
  </Alert>
);

const alertActions = () => <AlertActions>Hi</AlertActions>;

const buttons = () => (
  <React.Fragment>
    <Button buttonRef={noopRef} className="7" secondary>
      button
    </Button>
    <Button secondary={false}>button</Button>
  </React.Fragment>
);

const checkbox = () => (
  <Checkbox
    checkboxRef={noopRef}
    id="id"
    name="name"
    label="label"
    value="tacos"
    checked
    disabled
    className="hi"
    onChange={noopEventHandler}
  >
    checkbox
  </Checkbox>
);

const ftpo = () => (
  <FirstTimePointOut
    dismissText="dismiss"
    ftpRef={noopRef}
    headerId="id"
    noArrow
    onClose={noop}
  >
    hi
  </FirstTimePointOut>
);

const icon = () => <Icon label="icon" type="type" />;

const link = () => <Link>link</Link>;

const loader = () => <Loader label="loader" />;

const items = () => (
  <React.Fragment>
    <MenuItem menuItemRef={noopRef} onClick={noop} onKeyDown={noopEventHandler}>
      hi
    </MenuItem>
    <MenuItem>hi</MenuItem>
  </React.Fragment>
);

const modal = () => (
  <Modal
    className="hi"
    forceAction
    closeButtonText="close"
    heading={{ text: 'hello' }}
    modalRef={noopRef}
    onClose={noop}
    show
  >
    <ModalContent>content</ModalContent>
    <ModalFooter>footer</ModalFooter>
  </Modal>
);

const offscreen = () => <Offscreen className="bananas">offscreen</Offscreen>;

const options = () => (
  <OptionsMenuWrapper>
    <OptionsMenuTrigger
      className="hi"
      onClick={noopEventHandler}
      onKeyDown={noopEventHandler}
      triggerRef={noopRef}
    >
      hi
    </OptionsMenuTrigger>
    <OptionsMenu onClose={noop} onSelect={noop} id="id" show closeOnSelect>
      <OptionsMenuItem>hi</OptionsMenuItem>
    </OptionsMenu>
  </OptionsMenuWrapper>
);

const radio = () => (
  <RadioGroup
    name="hi"
    aria-labelledby="hello"
    defaultValue="banana"
    radios={[{ id: 'id', label: 'label', value: 'value' }]}
    onChange={noopEventHandler}
  />
);

const scrim = () => <Scrim show>hi</Scrim>;

const select = () => (
  <Select
    className="hi"
    label="7"
    listId="sdfsdf"
    onKeyDown={noopEventHandler}
    onSelect={noopEventHandler}
    required
    value="6"
    selectedId="7"
    options={[
      { value: 'Monday' },
      { value: 'Tuesday' },
      { value: 'Wednesday' },
      { value: 'Thursday', label: <span /> },
      { value: 'Friday' },
      { value: 'Saturday', disabled: true },
      { value: 'Sunday', label: 'hi' }
    ]}
  />
);

const sidebar = () => (
  <Sidebar onDismiss={noop} className="hi" show>
    hello
  </Sidebar>
);

const skiplink = () => (
  <SkipLink skipText="hi" target="hello" targetText="bye">
    banana
  </SkipLink>
);

const toast = () => (
  <Toast
    autoHide={12}
    dismissText="hi"
    onDismiss={noop}
    toastRef={noopRef}
    show
    type="confirmation"
  >
    hi
  </Toast>
);

const topbar = () => (
  <TopBar hasTrigger>
    <TopBarTrigger onClick={noopEventHandler} onKeyDown={noopEventHandler}>
      hi
    </TopBarTrigger>
  </TopBar>
);

const workspace = () => <Workspace workspaceRef={noopRef}>hi</Workspace>;

const ariaIsolate = () => {
  const el = document.getElementById('foo');
  if (!el) return;
  const ai = new AriaIsolate(el);
  ai.activate();
  ai.affectedElements.length;
  ai.element.nodeName;
  ai.deactivate();
};

document.querySelectorAll(focusableSelector);

const textField = () => (
  <TextField
    label={<span>Email</span>}
    id="email"
    error={<span>invalid email</span>}
    defaultValue="foo@bar.io"
    onChange={noop}
    fieldRef={noop}
    required
    requiredText="Required"
    aria-describedby="help-text"
  />
);

const clickOutside = () => {
  <ClickOutsideListener
    onClickOutside={noopEventHandler}
    mouseEvent="click"
    touchEvent="touchend"
  >
    <div>foo</div>
  </ClickOutsideListener>;
};

const expandCollapse = () => {
  <ExpandCollapsePanel
    id="expand-collapse-panel"
    animationTiming={0}
    onToggle={noopEventHandler}
  >
    <div>foo</div>
  </ExpandCollapsePanel>;
};

const expandCollapseTrigger = () => {
  <>
    <PanelTrigger
      id="expand-collapse-trigger"
      open={true}
      onClick={noopEventHandler}
    >
      <div>foo</div>
    </PanelTrigger>
    <PanelTrigger
      id="expand-collapse-trigger2"
      open={true}
      onClick={noopEventHandler}
    >
      {({ open }: any) => (open ? 'Open' : 'Closed')}
    </PanelTrigger>
  </>;
};

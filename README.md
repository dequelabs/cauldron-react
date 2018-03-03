# Cauldron React

This project is used internally by Deque Systems and is only updated when Deque needs changes for our internal use. You are free to use this project and to learn from the patterns and techniques that we used to make the widgets accessible. However we do not intend to respond to questions, feature requests, fix bugs or integrate external pull requests unless we find ourselves sitting around one day with nothing better to do. We promise, in return, not to submit questions, feature requests, bugs and pull requests to your internal projects.

## Installation

```sh
$ npm install --save cauldron-react
```

It is required that you also include the [cauldron](https://github.com/dequelabs/pattern-library) css.  This can be done by either installing it on npm (`npm i --save deque-pattern-library`) or using a cdn like unpkg (`<link rel="stylesheet" href="https://unpkg.com/deque-pattern-library/dist/css/pattern-library.min.css">`)

## Components / Composites

### `<Workspace />`

```js
import { Workspace } from 'cauldron-react';
```

The Workspace component should be used as the main content (`role="main"`) wrapper.

#### props

- `children` __{Array|Object|String}__ (required)

*NOTE*: All additional props will be passed through to the main element


```js
<Workspace id='wrapper'>
  <h1>Get schwifty</h1>
</Workspace>
```

### `<Button />`

```js
import { Button } from 'cauldron-react';
```

The Button component used for both primary and secondary buttons.

#### props

- `children` __{Array|Object|String}__ (optional)
- `secondary` __{Boolean}__ (optional): if the button should be a secondary button (defaults to `false`).
- `buttonRef` __{Function}__ (optional): a ref function to get a element reference of the button element.

*NOTE*: All additional props will be passed through to the main element

```js
<Button>OK</Button>
<Button secondary={true}>Cancel</Button>
```

### `<FirstTimePointOut />`

```js
import { FirstTimePointOut } from 'cauldron-react';
```

#### props

- `headerId` __{String}__ (required): The id of the ftpo's heading.  It will be applied as the `aria-labelledby` value on the ftpo wrapper.
- `children` __{Array|Object|String}__ (optional)
- `ftpRef` __{Function}__ (optional): a ref function to get a element reference of the ftpo wrapper element.
- `onClose` __{Function}__ (optional): function to be called when the ftpo is dismissed (either by escape keypress or clicking the dismiss button)
- `noArrow` __{Boolean}__ (optional): if `true`, an ftpo without an arrow will be rendered.

```js
<FirstTimePointOut headerId={'ftpo-head'}>
  <h4 id={'ftpo-head'}>First time point out!</h4>
  <p>This is a first time point out with a pointer</p>
</FirstTimePointOut>
<FirstTimePointOut headerId={'ftpo-head-no-arrow'} noArrow={true}>
  <h4 id={'ftpo-head-no-arrow'}>First time point out!</h4>
  <p>This is a first time point out without a pointer</p>
</FirstTimePointOut>
```

### `<Link />`

```js
import { FirstTimePointOut } from 'cauldron-react';
```

#### props

*NOTE*: All props will be passed through to the `<a />` element

```js
<Link href='/foo/bar'>Bar</Link>
```

### `<Loader />`

```js
import { Loader } from 'cauldron-react';
```

This component is during a fetching/loading state.

#### props

- `label` __{String}__ (required): the desired accessible name of the loader (will be set as the element's `aria-label`).

*NOTE*: All props will be passed through to the loader `<div />`

```js
<Loader label='Running automated tests with aXe-core...' />
```

### `<Toast />`

```js
import { Toast } from 'cauldron-react';
```

The toast notification component.

#### props

- `children` __{Array|Object|String}__ (required): the ui to be added as the message of the toast.
- `type` __{String}__ (required): the toast type ("confirmation", "caution", or "action-needed").
- `onDismiss` __{Function}__ (optional): function to be executed when toast is dismissed.
- `autoHide` __{Number}__ (optional): if provided, should be the number (in ms) to display the toast before automatically hiding it.
- `dismissText` __{String}__ (optional): text to be added as the aria-label of the "x" dismiss button (defaults to "Dismiss").
- `toastRef` __{Function}__ (optional): a ref function to get a element reference of the toast element.
- `show` __{Boolean}__ (optional): whether or not to show the toast.

```js
<Toast
  type={'caution'}
  onDismiss={this.onToastDismiss}
  show={type === 'caution'}
>
  Your software is out of date, please update it.
</Toast>
```

### `<Alert />`

```js
import { Alert, AlertActions } from 'cauldron-react';
```

The Alert component can be used with it's child component `<AlertActions />`

#### props

- `children` __{Array|Object|String}__ (required): the ui to be added as the content of the alert.
- `show` __{Boolean}__ (optional): whether or not to show the alert.
- `alertRef` __{Function}__ (optional): a ref function to get a element reference of the alert element.
- `contentRef` __{Function}__ (optional): a ref function to get a element reference of the alert's content element.
- `onClose` __{Function}__ (optional): function to be executed when alert is dismissed.
- `forceAction` __{Boolean}__ (optional): if `true`, escape will not dismiss the alert and the only way to dismiss the alert will be from updating the `show` prop to `false`.
- `className` __{String}__ (optional): any additional class(es) to be added to the alert element.

### `<AlertActions />`

#### props

- `children` __{Array|Object|String}__ (required): the ui to be added as the alert's actions (usually button(s)).

```js
<Alert
  onClose={this.toggleSimpleAlert}
  show={showSimpleAlert}
>
  <p>Stuff and things...</p>
  <AlertActions>
    <Button onClick={this.toggleSimpleAlert}>OK</Button>
    <Button secondary={true} onClick={this.toggleSimpleAlert}>
      Cancel
    </Button>
  </AlertActions>
</Alert>
```

### `<Modal />`

```js
import { Modal, ModalContent, ModalFooter } from 'cauldron-react';
```

The Modal component can be used with it's child components `<ModalContent />` and `<ModalFooter />`

#### props

- `children` __{Array|Object|String}__ (required)
- `heading`: __{Object}__ (required): an object with a required `text` property containing the desired text of the modal heading. It can also include a `level` property to dictate the heading level (defaults to `2`).
- `show` __{Boolean}__ (optional): whether or not to show the modal.
- `modalRef` __{Function}__ (optional): a ref function to get a element reference of the modal element.
- `onClose` __{Function}__ (optional): function to be executed when modal is dismissed.
- `forceAction` __{Boolean}__ (optional): if `true`, escape will not dismiss the modal and no close button will be rendered (the only way to dismiss it will be from updating the `show` prop to `false`).
- `className` __{String}__ (optional): any additional class(es) to be added to the modal element.
- `closeButtonText` __{String}__ (optional): the desired text of the close button (defaults to `"Close"`).

### `<ModalContent />`

### props

- `children` __{Array|Object|String}__ (required)

### `<ModalFooter />`

### props

- `children` __{Array|Object|String}__ (required)


```js
<Modal
  show={showSimpleModal}
  heading={{ text: 'Simple Modal' }}
  onClose={this.toggleSimpleModal}
>
  <ModalContent>
    <p>{'This is a simple modal and stuff'}</p>
  </ModalContent>
  <ModalFooter>
    <Button onClick={this.toggleSimpleModal}>{'Save'}</Button>
    <Button secondary={true} onClick={this.toggleSimpleModal}>{'Cancel'}</Button>
  </ModalFooter>
</Modal>
```

### `<TopBar />`

```js
import { TopBar, TopBarItem, TopBarTrigger } from 'cauldron-react';
```

The TopBar component's direct children must all be either `<TopBarItem />`s or `<TopBarTrigger />`s

```js
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
```

#### props

- `children` __{Object|Array}__ (required)

### `<TopBarItem />`

Menu item component for the top bar

#### props

- `index` __{Number}__ (required): the zero-based index of the given menuitem.
- `menuItemRef` __{Function}__ (optional): a ref function to get a element reference of the menuitem element.

*NOTE*: All props will be passed through to the menuitem

### `<TopBarTrigger />`

The hamburger menu trigger for the sidebar

#### props

- `index` __{Number}__ (required): the zero-based index of the given menuitem.
- `menuItemRef` __{Function}__ (optional): a ref function to get a element reference of the side bar trigger element.

*NOTE*: All props will be passed through to the menuitem

```js
<TopBar>
  <TopBarTrigger index={0} />
  <TopBarItem index={1}>
    <Link tabIndex={-1} to='/'>Foo</Link>
  </TopBarItem>
  <TopBarItem index={2}>
    <Link tabIndex={-1} to='/'>Bar</Link>
  </TopBarItem>
  <TopBarItem index={3}>
    <Link tabIndex={-1} to='/'>Baz</Link>
  </TopBarItem>
</TopBar>
```

### `<SideBar />`

```js
import { SideBar, SideBarItem } from 'cauldron-react';
```

The SideBar component's direct children all must be `<SideBarItem />`s

#### props

- `children` __{Object|Array}__ (required)

### `<SideBarItem />`

Menu item component for the top bar

#### props

- `index` __{Number}__ (required): the zero-based index of the given menuitem.
- `menuItemRef` __{Function}__ (optional): a ref function to get a element reference of the menuitem element.

*NOTE*: All props will be passed through to the menuitem

```js
<SideBar>
  <SideBarItem index={0}>
    <Link tabIndex={-1} href='/foo'>Foo</Link>
  </SideBarItem>
  <SideBarItem index={1}>
    <Link tabIndex={-1} href='/bar'>Bar</Link>
  </SideBarItem>
  <SideBarItem index={2}>
    <Link tabIndex={-1} to='/baz'>Baz</Link>
  </SideBarItem>
</SideBar>
```

### `<SkipLink />`

```js
import { SkipLink } from 'cauldron-react';
```

#### props

- `target` __{String}__ (required): a valid id hash string (example: '#foo').
- `skipText` __{String}__ (optional): The desired "Skip to" text (defaults to "Skip to").
- `targetText` __{String}__ (optional): The desired text for the target's name (defaults to "Main Content").


## Demo App

To make development / manual testing easy, there is a demo app which can be started by executing:

```sh
$ npm start
```

_see the `demo/` directory_

_webpack-jarvis dashboard served @ port 1337_


## Building Cauldron React

```sh
$ npm run build
```

NOTE: for production build run `$ npm run prepack`

## Testing

```sh
$ npm test
```

NOTE: for test watcher (re-run when stuff changes) run `$ npm run test:dev`

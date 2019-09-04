# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="5.0.0"></a>

# [5.0.0](https://github.com/dequelabs/cauldron-react/compare/v4.0.1...v5.0.0) (2019-09-04)

### Bug Fixes

- **Select:** adds accessible name to listbox ([#196](https://github.com/dequelabs/cauldron-react/issues/196)) ([cb046d8](https://github.com/dequelabs/cauldron-react/commit/cb046d8)), closes [#195](https://github.com/dequelabs/cauldron-react/issues/195)
- **Select:** prevent unwanted <form> submissions ([#189](https://github.com/dequelabs/cauldron-react/issues/189)) ([8030afd](https://github.com/dequelabs/cauldron-react/commit/8030afd)), closes [#188](https://github.com/dequelabs/cauldron-react/issues/188) [#186](https://github.com/dequelabs/cauldron-react/issues/186)
- **TextField:** properly implement `HTMLInputElement` props ([#193](https://github.com/dequelabs/cauldron-react/issues/193)) ([40840eb](https://github.com/dequelabs/cauldron-react/commit/40840eb))
- **types:** correct several pass through prop definitions ([#191](https://github.com/dequelabs/cauldron-react/issues/191)) ([08dd88c](https://github.com/dequelabs/cauldron-react/commit/08dd88c)), closes [#182](https://github.com/dequelabs/cauldron-react/issues/182)

### Features

- implement smaller ftpo arrows from pattern-library ([#202](https://github.com/dequelabs/cauldron-react/issues/202)) ([1cfdbcd](https://github.com/dequelabs/cauldron-react/commit/1cfdbcd))

### BREAKING CHANGES

- FTPOs have new positioning and layout due to smaller arrows

<a name="4.0.1"></a>

## [4.0.1](https://github.com/dequelabs/cauldron-react/compare/v4.0.0...v4.0.1) (2019-07-26)

### Bug Fixes

- **Select:** correct `onSelect` TypeScript definition ([#183](https://github.com/dequelabs/cauldron-react/issues/183)) ([423afc5](https://github.com/dequelabs/cauldron-react/commit/423afc5))
- **TextField:** correct "multiline" typo ([#184](https://github.com/dequelabs/cauldron-react/issues/184)) ([16dc06a](https://github.com/dequelabs/cauldron-react/commit/16dc06a))
- **TextField:** support `type=` and `name=` props ([#179](https://github.com/dequelabs/cauldron-react/issues/179)) ([29793e3](https://github.com/dequelabs/cauldron-react/commit/29793e3)), closes [#178](https://github.com/dequelabs/cauldron-react/issues/178)

<a name="4.0.0"></a>

# [4.0.0](https://github.com/dequelabs/cauldron-react/compare/v3.0.0...v4.0.0) (2019-07-25)

### Bug Fixes

- remove duplicate ids from visible FTPO ([#174](https://github.com/dequelabs/cauldron-react/issues/174)) ([9de06c2](https://github.com/dequelabs/cauldron-react/commit/9de06c2))

### BREAKING CHANGES

- introduced heading prop for FTPOs replacing headerId and strip ids from visible FTPOs

<a name="3.0.0"></a>

# [3.0.0](https://github.com/dequelabs/cauldron-react/compare/v2.0.0...v3.0.0) (2019-07-22)

### Bug Fixes

- allow expand/collapse panel to render multiple children ([#157](https://github.com/dequelabs/cauldron-react/issues/157)) ([18e6969](https://github.com/dequelabs/cauldron-react/commit/18e6969))
- removes use of document.Element for ssr's sake ([#154](https://github.com/dequelabs/cauldron-react/issues/154)) ([56296ce](https://github.com/dequelabs/cauldron-react/commit/56296ce))
- use native keyDown event for optionsmenu instead of React's synthetic event system ([#151](https://github.com/dequelabs/cauldron-react/issues/151)) ([e6734a9](https://github.com/dequelabs/cauldron-react/commit/e6734a9))
- **OptionsMenu:** passes className through to options menu wrapper ([#169](https://github.com/dequelabs/cauldron-react/issues/169)) ([c5314b0](https://github.com/dequelabs/cauldron-react/commit/c5314b0)), closes [#161](https://github.com/dequelabs/cauldron-react/issues/161)

### Features

- allow expand/collapse component to be controlled ([#156](https://github.com/dequelabs/cauldron-react/issues/156)) ([7041f51](https://github.com/dequelabs/cauldron-react/commit/7041f51))
- **Demo:** supports jsx children in demo component ([#163](https://github.com/dequelabs/cauldron-react/issues/163)) ([0aa4ce0](https://github.com/dequelabs/cauldron-react/commit/0aa4ce0))
- **Select:** updates the select component to newer recommended approach ([#160](https://github.com/dequelabs/cauldron-react/issues/160)) ([0d3c8b6](https://github.com/dequelabs/cauldron-react/commit/0d3c8b6))
- ensures all demo pages have unique/descriptive document titles ([#168](https://github.com/dequelabs/cauldron-react/issues/168)) ([2d1a632](https://github.com/dequelabs/cauldron-react/commit/2d1a632)), closes [#32](https://github.com/dequelabs/cauldron-react/issues/32)

### BREAKING CHANGES

- **Select:** removes props.listId and selectedId

<a name="2.1.0"></a>

# [2.1.0](https://github.com/dequelabs/cauldron-react/compare/v2.0.0...v2.1.0) (2019-07-10)

### Bug Fixes

- allow expand/collapse panel to render multiple children ([#157](https://github.com/dequelabs/cauldron-react/issues/157)) ([18e6969](https://github.com/dequelabs/cauldron-react/commit/18e6969))
- removes use of document.Element for ssr's sake ([#154](https://github.com/dequelabs/cauldron-react/issues/154)) ([56296ce](https://github.com/dequelabs/cauldron-react/commit/56296ce))
- use native keyDown event for optionsmenu instead of React's synthetic event system ([#151](https://github.com/dequelabs/cauldron-react/issues/151)) ([e6734a9](https://github.com/dequelabs/cauldron-react/commit/e6734a9))

### Features

- allow expand/collapse component to be controlled ([#156](https://github.com/dequelabs/cauldron-react/issues/156)) ([7041f51](https://github.com/dequelabs/cauldron-react/commit/7041f51))

<a name="2.0.0"></a>

# [2.0.0](https://github.com/dequelabs/cauldron-react/compare/v1.0.0...v2.0.0) (2019-06-18)

### Bug Fixes

- actually run assertions in tests for expand/collapse component ([#136](https://github.com/dequelabs/cauldron-react/issues/136)) ([bc4b70e](https://github.com/dequelabs/cauldron-react/commit/bc4b70e))
- allow classnames to be added to existing menuitem class ([#137](https://github.com/dequelabs/cauldron-react/issues/137)) ([dbf713d](https://github.com/dequelabs/cauldron-react/commit/dbf713d))
- don't render falsy children in OptionsMenu ([#138](https://github.com/dequelabs/cauldron-react/issues/138)) ([b3768e0](https://github.com/dequelabs/cauldron-react/commit/b3768e0))
- don't run animations when animationTiming is not set ([#132](https://github.com/dequelabs/cauldron-react/issues/132)) ([6bcbedb](https://github.com/dequelabs/cauldron-react/commit/6bcbedb))
- set default onSelect for OptionsMenuItem ([#140](https://github.com/dequelabs/cauldron-react/issues/140)) ([75c5ba8](https://github.com/dequelabs/cauldron-react/commit/75c5ba8))

### Features

- add expand/collapse component ([#113](https://github.com/dequelabs/cauldron-react/issues/113)) ([67d1517](https://github.com/dequelabs/cauldron-react/commit/67d1517))
- **Icon:** allows className to be passed through to the icon div ([#126](https://github.com/dequelabs/cauldron-react/issues/126)) ([1c3da6a](https://github.com/dequelabs/cauldron-react/commit/1c3da6a))
- add topbar menu component ([#130](https://github.com/dequelabs/cauldron-react/issues/130)) ([24790d1](https://github.com/dequelabs/cauldron-react/commit/24790d1))
- **Loader:** supports loader without label ([#135](https://github.com/dequelabs/cauldron-react/issues/135)) ([4352e1f](https://github.com/dequelabs/cauldron-react/commit/4352e1f)), closes [#133](https://github.com/dequelabs/cauldron-react/issues/133)
- allow OptionsMenuItem to be disabled ([#139](https://github.com/dequelabs/cauldron-react/issues/139)) ([f4f6dfb](https://github.com/dequelabs/cauldron-react/commit/f4f6dfb))

### Breaking Changes

- split OptionsMenu into List and controlled component ([#141](https://github.com/dequelabs/cauldron-react/issues/141)) ([ce240be](https://github.com/dequelabs/cauldron-react/commit/ce240be))

<a name="1.0.0"></a>

# [1.0.0](https://github.com/dequelabs/cauldron-react/compare/v0.5.1...v1.0.0) (2019-05-28)

### Bug Fixes

- allows classNames to be passed in for ftpos ([#118](https://github.com/dequelabs/cauldron-react/issues/118)) ([a648f42](https://github.com/dequelabs/cauldron-react/commit/a648f42))
- click nested links inside OptionsMenuItem ([#107](https://github.com/dequelabs/cauldron-react/issues/107)) ([1622f20](https://github.com/dequelabs/cauldron-react/commit/1622f20))
- demo unable to open sidebar when collapsed ([#109](https://github.com/dequelabs/cauldron-react/issues/109)) ([2f7aa3f](https://github.com/dequelabs/cauldron-react/commit/2f7aa3f))
- falsy children in TopBar preventing correct focus navigation ([#110](https://github.com/dequelabs/cauldron-react/issues/110)) ([555f7c6](https://github.com/dequelabs/cauldron-react/commit/555f7c6))
- mark `classnames` as a production dependency ([#121](https://github.com/dequelabs/cauldron-react/issues/121)) ([2ad291b](https://github.com/dequelabs/cauldron-react/commit/2ad291b)), closes [/github.com/dequelabs/cauldron-react/blob/v0.5.1/src/components/Button/index.js#L3](https://github.com//github.com/dequelabs/cauldron-react/blob/v0.5.1/src/components/Button/index.js/issues/L3)
- push state upwards in Toast and refactor deprecated method ([#108](https://github.com/dequelabs/cauldron-react/issues/108)) ([fc5268a](https://github.com/dequelabs/cauldron-react/commit/fc5268a))

### Chores

- remove UMD build ([#120](https://github.com/dequelabs/cauldron-react/issues/120)) ([426d339](https://github.com/dequelabs/cauldron-react/commit/426d339))

### Features

- add browserslist ([#119](https://github.com/dequelabs/cauldron-react/issues/119)) ([61854fe](https://github.com/dequelabs/cauldron-react/commit/61854fe))
- add ClickOutsideListener component to capture outside of children events ([#101](https://github.com/dequelabs/cauldron-react/issues/101)) ([8dc04f5](https://github.com/dequelabs/cauldron-react/commit/8dc04f5))
- add closeOnSelect prop to OptionsMenu ([#102](https://github.com/dequelabs/cauldron-react/issues/102)) ([a168bd5](https://github.com/dequelabs/cauldron-react/commit/a168bd5))
- add onSelect func prop to OptionsMenu ([#100](https://github.com/dequelabs/cauldron-react/issues/100)) ([6860f0e](https://github.com/dequelabs/cauldron-react/commit/6860f0e))
- add prop to set arrow positions on first time point out ([#99](https://github.com/dequelabs/cauldron-react/issues/99)) ([bf2bc43](https://github.com/dequelabs/cauldron-react/commit/bf2bc43))
- allow buttons to be styled based on prop ([#114](https://github.com/dequelabs/cauldron-react/issues/114)) ([36dc542](https://github.com/dequelabs/cauldron-react/commit/36dc542))
- demo component to be used to document components ([#116](https://github.com/dequelabs/cauldron-react/issues/116)) ([cb2db3a](https://github.com/dequelabs/cauldron-react/commit/cb2db3a))

### BREAKING CHANGES

- we no longer support UMD. If you want to use this library, you must use a bundler.

Closes https://github.com/dequelabs/cauldron-react/issues/68

- removed secondary as a boolean prop

<a name="0.5.1"></a>

## [0.5.1](https://github.com/dequelabs/cauldron-react/compare/v0.5.0...v0.5.1) (2019-04-10)

### Bug Fixes

- **Modal:** passes props through to ModalContent/ModalFooter elements ([#94](https://github.com/dequelabs/cauldron-react/issues/94)) ([75be1f3](https://github.com/dequelabs/cauldron-react/commit/75be1f3))

<a name="0.5.0"></a>

# [0.5.0](https://github.com/dequelabs/cauldron-react/compare/v0.4.0...v0.5.0) (2019-04-05)

### Bug Fixes

- **types:** allow <div> props to be passed to icon ([#83](https://github.com/dequelabs/cauldron-react/issues/83)) ([5dbd63f](https://github.com/dequelabs/cauldron-react/commit/5dbd63f))
- add false default value for workspace 'noSideBar' prop ([#85](https://github.com/dequelabs/cauldron-react/issues/85)) ([247d8ab](https://github.com/dequelabs/cauldron-react/commit/247d8ab))
- adds missing menu role to sidebar ([#87](https://github.com/dequelabs/cauldron-react/issues/87)) ([055c185](https://github.com/dequelabs/cauldron-react/commit/055c185))

### Features

- **TextField:** adds support for textareas via multiline prop ([#89](https://github.com/dequelabs/cauldron-react/issues/89)) ([6dba228](https://github.com/dequelabs/cauldron-react/commit/6dba228)), closes [#70](https://github.com/dequelabs/cauldron-react/issues/70)
- **Workspace:** supports noSideBar prop for apps without sidebars ([#80](https://github.com/dequelabs/cauldron-react/issues/80)) ([771dd57](https://github.com/dequelabs/cauldron-react/commit/771dd57))

<a name="0.4.0"></a>

# [0.4.0](https://github.com/dequelabs/cauldron-react/compare/v0.3.0...v0.4.0) (2019-03-27)

### Bug Fixes

- add missing `autoClickLink` prop to MenuItem ts def ([#76](https://github.com/dequelabs/cauldron-react/issues/76)) ([0072c8b](https://github.com/dequelabs/cauldron-react/commit/0072c8b))
- export `Main` and `Layout` ([#64](https://github.com/dequelabs/cauldron-react/issues/64)) ([a76d449](https://github.com/dequelabs/cauldron-react/commit/a76d449))
- **TopBar:** support falsy children ([#74](https://github.com/dequelabs/cauldron-react/issues/74)) ([73ef1be](https://github.com/dequelabs/cauldron-react/commit/73ef1be)), closes [#72](https://github.com/dequelabs/cauldron-react/issues/72)
- **types:** allow any div/button props on Button and Modal components ([#78](https://github.com/dequelabs/cauldron-react/issues/78)) ([78c1e93](https://github.com/dequelabs/cauldron-react/commit/78c1e93))
- **types:** correct Modal heading proptypes ([#79](https://github.com/dequelabs/cauldron-react/issues/79)) ([d85b7f7](https://github.com/dequelabs/cauldron-react/commit/d85b7f7))
- **typescript:** correct <MenuItem /> props ([#66](https://github.com/dequelabs/cauldron-react/issues/66)) ([320d322](https://github.com/dequelabs/cauldron-react/commit/320d322))

### Features

- add option to disable "auto clicking" links ([#75](https://github.com/dequelabs/cauldron-react/issues/75)) ([c7ceca8](https://github.com/dequelabs/cauldron-react/commit/c7ceca8)), closes [#73](https://github.com/dequelabs/cauldron-react/issues/73)
- add TypeScript definitions ([#55](https://github.com/dequelabs/cauldron-react/issues/55)) ([60d8b18](https://github.com/dequelabs/cauldron-react/commit/60d8b18))
- adds <Card /> components ([#77](https://github.com/dequelabs/cauldron-react/issues/77)) ([c31619f](https://github.com/dequelabs/cauldron-react/commit/c31619f))
- adds <Layout /> and <Main /> for more flexibility ([#63](https://github.com/dequelabs/cauldron-react/issues/63)) ([c699a38](https://github.com/dequelabs/cauldron-react/commit/c699a38)), closes [#61](https://github.com/dequelabs/cauldron-react/issues/61)

<a name="0.3.0"></a>

# [0.3.0](https://github.com/dequelabs/cauldron-react/compare/v0.2.0...v0.3.0) (2018-12-18)

### Features

- adds support for controlling checkbox with state ([#51](https://github.com/dequelabs/cauldron-react/issues/51)) ([1bddcc9](https://github.com/dequelabs/cauldron-react/commit/1bddcc9))

<a name="0.2.0"></a>

# [0.2.0](https://github.com/dequelabs/cauldron-react/compare/v0.1.4...v0.2.0) (2018-12-13)

### Features

- adds onChange prop to <Checkbox /> ([#49](https://github.com/dequelabs/cauldron-react/issues/49)) ([733247c](https://github.com/dequelabs/cauldron-react/commit/733247c))

<a name="0.1.4"></a>

## [0.1.4](https://github.com/dequelabs/cauldron-react/compare/v0.1.2...v0.1.4) (2018-12-13)

### Bug Fixes

- **demo:** correct basename for GitHub pages ([#46](https://github.com/dequelabs/cauldron-react/issues/46)) ([d8688b1](https://github.com/dequelabs/cauldron-react/commit/d8688b1))
- allow .js files in the npm package ([#47](https://github.com/dequelabs/cauldron-react/issues/47)) ([4f382ac](https://github.com/dequelabs/cauldron-react/commit/4f382ac))

<a name="0.1.3"></a>

## [0.1.3](https://github.com/dequelabs/cauldron-react/compare/v0.1.2...v0.1.3) (2018-12-05)

### Bug Fixes

- **demo:** correct basename for GitHub pages ([#46](https://github.com/dequelabs/cauldron-react/issues/46)) ([d8688b1](https://github.com/dequelabs/cauldron-react/commit/d8688b1))

<a name="0.1.2"></a>

## [0.1.2](https://github.com/dequelabs/cauldron-react/compare/v0.1.1...v0.1.2) (2018-10-30)

### Bug Fixes

- adds menubar to topbar's ul ([#36](https://github.com/dequelabs/cauldron-react/issues/36)) ([5097e65](https://github.com/dequelabs/cauldron-react/commit/5097e65)), closes [#35](https://github.com/dequelabs/cauldron-react/issues/35)

<a name="0.1.1"></a>

## [0.1.1](https://github.com/dequelabs/cauldron-react/compare/v0.1.0...v0.1.1) (2018-09-29)

<a name="0.1.0"></a>

# [0.1.0](https://github.com/dequelabs/cauldron-react/compare/v0.0.3...v0.1.0) (2018-09-17)

### Bug Fixes

- passes additional props through to [role=dialog] element ([#16](https://github.com/dequelabs/cauldron-react/issues/16)) ([d3b32e5](https://github.com/dequelabs/cauldron-react/commit/d3b32e5))
- supports localized ftpo dismiss button text via 'dismissText' prop ([#17](https://github.com/dequelabs/cauldron-react/issues/17)) ([a276694](https://github.com/dequelabs/cauldron-react/commit/a276694))

### Features

- adds RadioGroup component ([#24](https://github.com/dequelabs/cauldron-react/issues/24)) ([9ae5276](https://github.com/dequelabs/cauldron-react/commit/9ae5276))
- adds Checkbox component (closes [#21](https://github.com/dequelabs/cauldron-react/issues/21)) ([#26](https://github.com/dequelabs/cauldron-react/issues/26)) ([41c08c0](https://github.com/dequelabs/cauldron-react/commit/41c08c0))
- implements Select (closes [#6](https://github.com/dequelabs/cauldron-react/issues/6)) ([#19](https://github.com/dequelabs/cauldron-react/issues/19)) ([a195e1e](https://github.com/dequelabs/cauldron-react/commit/a195e1e))
- options menu, trigger, wrapper, and item components ([#14](https://github.com/dequelabs/cauldron-react/issues/14)) ([76dcfec](https://github.com/dequelabs/cauldron-react/commit/76dcfec))

<a name="0.0.3"></a>

## [0.0.3](https://github.com/dequelabs/cauldron-react/compare/v0.0.2...v0.0.3) (2018-03-02)

### Bug Fixes

- properly configures production build ([#10](https://github.com/dequelabs/cauldron-react/issues/10)) ([fea8693](https://github.com/dequelabs/cauldron-react/commit/fea8693))

<a name="0.0.2"></a>

## [0.0.2](https://github.com/dequelabs/cauldron-react/compare/v0.0.1...v0.0.2) (2018-03-02)

<a name="0.0.1"></a>

## 0.0.1 (2018-03-02)

### Features

- adds button, ftpo, topbar, sidebar, icon, scrim, alert, modal, and skiplink patterns ([#1](https://github.com/dequelabs/cauldron-react/issues/1)) ([d9f4a89](https://github.com/dequelabs/cauldron-react/commit/d9f4a89))
- adds loader pattern ([1b1c83f](https://github.com/dequelabs/cauldron-react/commit/1b1c83f))
- adds toast pattern ([c895eff](https://github.com/dequelabs/cauldron-react/commit/c895eff))

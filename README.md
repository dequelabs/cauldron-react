# Cauldron React

This project is used internally by Deque Systems and is only updated when Deque needs changes for our internal use. You are free to use this project and to learn from the patterns and techniques that we used to make the widgets accessible. However we do not intend to respond to questions, feature requests, fix bugs or integrate external pull requests unless we find ourselves sitting around one day with nothing better to do. We promise, in return, not to submit questions, feature requests, bugs and pull requests to your internal projects.

## Installation

```sh
$ npm install cauldron-react --save
```

**NOTE:** it is expected that you include the css from [deque-pattern-library](https://github.com/dequelabs/pattern-library)

## Demo App

To document through example and make development / manual testing easy, there is a demo app which can be started by executing:

```sh
$ yarn start
```

_see the `demo/` directory_

## Build

```sh
$ yarn build
```

NOTE: for production build run `$ yarn prepack`

## Test

```sh
$ yarn test
```

or to have tests automagically re-run when files change

```sh
$ yarn test:dev
```

# Cauldron React

This project is used internally by Deque Systems and is only updated when Deque needs changes for our internal use. You are free to use this project and to learn from the patterns and techniques that we used to make the widgets accessible. However we do not intend to respond to questions, feature requests, fix bugs or integrate external pull requests unless we find ourselves sitting around one day with nothing better to do. We promise, in return, not to submit questions, feature requests, bugs and pull requests to your internal projects.

[![CircleCI](https://circleci.com/gh/dequelabs/cauldron-react.svg?style=svg)](https://circleci.com/gh/dequelabs/cauldron-react)

## Installation

```sh
$ npm install cauldron-react --save
```

**NOTE:** it is expected that you include the css from [deque-pattern-library](https://github.com/dequelabs/pattern-library)

## Demo App

To document through example and make development / manual testing easy, there is a demo app which can be started by executing:

```sh
$ yarn dev
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

## Publishing

Publishing `cauldron-react` to the npm registry is handled by CircleCI. All (green) commits that land in the `master` branch will be released as a "canary" version (eg `1.2.3-canary.GIT_SHA`) and will be available with the `@next` dist tag. Additionally, all (green) tags that resemble a SEMVER version will be published as stable versions (eg `1.2.3`) and available with the `@latest` dist tag.

To install the latest canary version, do: `npm install cauldron-react@next`. To install the latest stable version, do `npm install cauldron-react`.

To publish a stable version, you'll do something like this:

```
# Ensure you have the latest code
$ git checkout master
$ git pull
# Run the release script
$ npm run release
# Create the release commit and tag
$ git commit -am "chore: Release vX.Y.Z"
$ git tag vX.Y.Z -a -m "Release vX.Y.Z"
# Push to origin
$ git push
```

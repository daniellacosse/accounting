# accounting cli 🤓 [![CircleCI](https://circleci.com/gh/daniellacosse/accounting-cli.svg?style=svg)]

[![documentation](https://img.shields.io/badge/documentation-blue.svg)](https://github.com/daniellacosse/accounting-cli/tree/master/documentation#process-automation-srcrary-documentation) [![npm version](https://badge.fury.io/js/%40daniellacosse%2Faccounting-cli.svg)](https://badge.fury.io/js/%40daniellacosse%2Faccounting-cli) (https://circleci.com/gh/daniellacosse/accounting-cli)

> before you get started, you need `brew`: [macos](https://brew.sh/) | [linux](https://docs.brew.sh/Homebrew-on-Linux)

## commands

You'll be prompted for a trello key - generate one [here](https://trello.com/app-key/)

> NOTE: If `make` doesn't work, try `brew bundle`.

### `default` : run the cli

```sh
make CMD=<your:command>
```

  - `trello:rollup` :: count up the number of recent cards by label
  - `trello:reset` :: delete all recent cards and create new ones based on the templates in `config`
  - `file:checkup` :: copy a "checkup" template, open relevant resources for filling the template
  - `file:accounting` :: copy an "accounting" template, open relevant resources for filling the template


### `branch` :  start a new branch

```sh
make branch NAME=<your-branch>
```

### `lint` : run the linter

```sh
make lint
```

### `test` : run the unit tests

```sh
make test
```

### `watch` : run the tests as you edit code

```sh
make watch
```

### `coverage` : check if we have sufficient test coverage

```sh
make coverage
```

### `ci` : debug a continuous integration job locally

```sh
make ci JOB=<your-circle-job>
```

**JOB options**

 - `build`
 - `list`
 - `test`
 - `coverage`
 - `release_patch` - ⚠️ runs `make release!` _this won't work w/o an SSH key._

### ⚠️ `release!` : publishes a release!!! **BE CAREFUL**

```sh
make release!
```

### ⚠️ `flush-*!` : clears out generated files!! **BE CAREFUL**


```sh
make flush-all!
```

 - `flush-deps!` - clears out dependency locks. **forces all your dependencies to reinstall.**
 - `flush-build!` - clears the build. **forces the api to rebuild**
 - `flush-docs!` - destroys all the docs so they can be rebuilt
 - `flush-ci!` - destroys the local ci config
 - `flush-coverage!` - deletes the last coverage report
 - `flush-tmp!` - clears out everything but the docs
 - `flush-all!` - clears all generated files

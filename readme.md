# accounting cli 🤓 [![CircleCI](https://circleci.com/gh/daniellacosse/accounting-cli.svg?style=svg)](https://circleci.com/gh/daniellacosse/accounting-cli)

[![documentation](https://img.shields.io/badge/documentation-blue.svg)](https://github.com/daniellacosse/accounting-cli/tree/master/documentation#process-automation-srcrary-documentation) [![npm version](https://badge.fury.io/js/%40daniellacosse%2Faccounting-cli.svg)](https://badge.fury.io/js/%40daniellacosse%2Faccounting-cli)

> before you get started, you need `brew`: <br>
> [install on mac](https://brew.sh/) | [install on linux](https://docs.brew.sh/Homebrew-on-Linux)

## commands

You'll be prompted for a trello key - generate one [here](https://trello.com/app-key/)

### `default` : run the cli

```sh
make CMD=<your:command>
```

  - `trello:rollup` :: count up the number of recent cards by label
  - `trello:reset` :: delete all recent cards and create new ones based on the templates in `config`
  - `file:checkup` :: copy a "checkup" template, open relevant resources for filling the template
  - `file:accounting` :: copy an "accounting" template, open relevant resources for filling the template

> NOTE: If `make` doesn't work, try `brew bundle` first.

### `lint` : run the linter

```sh
make lint
```

### `test` : run the unit tests

```sh
make test
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

### ⚠️ `reset!` : clears out all temporary generated files!! **BE CAREFUL**


```sh
make reset!
```

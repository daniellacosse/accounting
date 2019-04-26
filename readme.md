# accounting cli

[![npm version](https://badge.fury.io/js/%40daniellacosse%2Faccounting-cli.svg)](https://badge.fury.io/js/%40daniellacosse%2Faccounting-cli) [![documentation](https://img.shields.io/badge/documentation-blue.svg)](https://github.com/daniellacosse/accounting-cli/tree/master/documentation#process-automation-srcrary-documentation) [![CircleCI](https://circleci.com/gh/daniellacosse/accounting-cli.svg?style=svg)](https://circleci.com/gh/daniellacosse/accounting-cli)


before you get started, you need `brew`. [macos](https://brew.sh/) | [linux](https://docs.brew.sh/Homebrew-on-Linux)

```sh
make CMD=<your:command>
```
You'll be prompted for a trello key - generate one [here](https://trello.com/app-key/)

> NOTE: If `make` doesn't work, try `brew bundle`.

### commands

- `trello:rollup` :: count up the number of recent cards by label
- `trello:reset` :: delete all recent cards and create new ones based on the templates in `config`
- `file:checkup` :: copy a "checkup" template, open relevant resources for filling the template
- `file:accounting` :: copy an "accounting" template, open relevant resources for filling the template

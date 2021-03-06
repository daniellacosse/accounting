
#  Accounting CLI

## Index

### Modules

* ["trello"](modules/_trello_.md)

### Classes

* [TrelloRollup](classes/trellorollup.md)

### Interfaces

* [FileTemplateConfig](interfaces/filetemplateconfig.md)
* [TrelloCard](interfaces/trellocard.md)
* [TrelloContext](interfaces/trellocontext.md)
* [TrelloLabel](interfaces/trellolabel.md)
* [TrelloList](interfaces/trellolist.md)
* [TrelloTemplate](interfaces/trellotemplate.md)

### Type aliases

* [Domain](#domain)
* [Messageable](#messageable)

### Functions

* [boardReset](#boardreset)
* [cliRouter](#clirouter)
* [commandRunner](#commandrunner)
* [fileScriptRunner](#filescriptrunner)
* [generateTemplateCommands](#generatetemplatecommands)
* [getISOStartTimeForCard](#getisostarttimeforcard)
* [hasOccurredIn](#hasoccurredin)
* [labelRollup](#labelrollup)
* [monthly](#monthly)
* [trelloScriptRunner](#trelloscriptrunner)
* [weekly](#weekly)

---

## Type aliases

<a id="domain"></a>

###  Domain

**Ƭ Domain**: *"trello" \| "file" \| "echo"*

*Defined in [types/index.d.ts:15](https://github.com/daniellacosse/accounting-cli/blob/17f3697/types/index.d.ts#L15)*

___
<a id="messageable"></a>

###  Messageable

**Ƭ Messageable**: *`string` \| `object`*

*Defined in [types/index.d.ts:16](https://github.com/daniellacosse/accounting-cli/blob/17f3697/types/index.d.ts#L16)*

___

## Functions

<a id="boardreset"></a>

###  boardReset

▸ **boardReset**(existingCards: *[TrelloCard](interfaces/trellocard.md)[]*, __namedParameters: *`object`*): `Promise`<`string`>

*Defined in [source/trello-scripts/board-reset.ts:20](https://github.com/daniellacosse/accounting-cli/blob/17f3697/source/trello-scripts/board-reset.ts#L20)*

Iterates through the cards provided in the given context and deletes them, then going back and replacing them with the cards defined in the `templates.json` file.

*__export__*: default

*__module__*: trello

**Parameters:**

**existingCards: [TrelloCard](interfaces/trellocard.md)[]**

The list of currently existing cards on the board that are to be deleted.

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| boardID | `string` |
| templates | [TrelloTemplate](interfaces/trellotemplate.md)[] |
| trello | `any` |

**Returns:** `Promise`<`string`>
A promise containing a count of the diff ({deleted, created}) in cards.

___
<a id="clirouter"></a>

### `<Const>` cliRouter

▸ **cliRouter**(domain: *[Domain](#domain)*, command: *`string`*): `Promise`<[Messageable](#messageable)>

*Defined in [source/cli.ts:22](https://github.com/daniellacosse/accounting-cli/blob/17f3697/source/cli.ts#L22)*

the main entrypoint for the CLI. decides how to run the commands given in the shell

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| domain | [Domain](#domain) |  the resource to utilize (file system, trello, etc.) |
| command | `string` |  an action to take with said resource |

**Returns:** `Promise`<[Messageable](#messageable)>
a message to be logged in consola

___
<a id="commandrunner"></a>

###  commandRunner

▸ **commandRunner**(commands: *`string`[]*): `string`

*Defined in [source/file-scripts/command-runner.ts:10](https://github.com/daniellacosse/accounting-cli/blob/17f3697/source/file-scripts/command-runner.ts#L10)*

Runs the list of given shell commands.

*__export__*: commandRunner

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| commands | `string`[] |  the commands to run |

**Returns:** `string`
*   result message indicating commands run

___
<a id="filescriptrunner"></a>

###  fileScriptRunner

▸ **fileScriptRunner**(userCommand: *`string`*): `Promise`<`string`>

*Defined in [source/file-scripts/index.ts:11](https://github.com/daniellacosse/accounting-cli/blob/17f3697/source/file-scripts/index.ts#L11)*

Takes a supported file command, runs that function, and returns the result.

*__export__*: 

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userCommand | `string` |  The command that this script runner will run. |

**Returns:** `Promise`<`string`>
A promise containing the results

___
<a id="generatetemplatecommands"></a>

###  generateTemplateCommands

▸ **generateTemplateCommands**(__namedParameters: *`object`*): `string`[]

*Defined in [source/file-scripts/template-file.ts:14](https://github.com/daniellacosse/accounting-cli/blob/17f3697/source/file-scripts/template-file.ts#L14)*

Opens up all the resources necessary to complete the Weekly Checkup.

*__export__*: generateTemplateCommands

**Parameters:**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| additionalUrls | `string`[] |
| command | `string` |
| destination | `string` |
| duration | "weekly" \| "monthly" \| "trimesterly" \| "yearly" |
| mimetype | "numbers" \| "pages" |

**Returns:** `string`[]
*   the list of commands to run

___
<a id="getisostarttimeforcard"></a>

###  getISOStartTimeForCard

▸ **getISOStartTimeForCard**(cardTemplate: *[TrelloTemplate](interfaces/trellotemplate.md)*, dayList: *[TrelloList](interfaces/trellolist.md)*): `string`

*Defined in [source/trello-scripts/get-iso-start-time-for-card.ts:12](https://github.com/daniellacosse/accounting-cli/blob/17f3697/source/trello-scripts/get-iso-start-time-for-card.ts#L12)*

Generates the appropriate ISOString for the day and time on the Trello objects provided.

*__export__*: default

*__module__*: trello

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| cardTemplate | [TrelloTemplate](interfaces/trellotemplate.md) |  the card we're currently creating. |
| dayList | [TrelloList](interfaces/trellolist.md) |  the day of the week list that this card belongs to. |

**Returns:** `string`
*   the start time as an ISO string.

___
<a id="hasoccurredin"></a>

###  hasOccurredIn

▸ **hasOccurredIn**(days: *`number`*): `function`

*Defined in [source/trello-scripts/occurred-since.ts:14](https://github.com/daniellacosse/accounting-cli/blob/17f3697/source/trello-scripts/occurred-since.ts#L14)*

Function factory for filter functions that determine if a trello card was due in a certain time window.

*__export__*: default

*__module__*: trello

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| days | `number` |  The length of the time window since the current date in days. |

**Returns:** `function`
The filter function generated to be run against relevant trello cards.

___
<a id="labelrollup"></a>

###  labelRollup

▸ **labelRollup**(cards: *[TrelloCard](interfaces/trellocard.md)[]*): `Promise`<`object`>

*Defined in [source/trello-scripts/label-rollup.ts:76](https://github.com/daniellacosse/accounting-cli/blob/17f3697/source/trello-scripts/label-rollup.ts#L76)*

Counts up the provided cards and returns an object representing the total number of cards completed against each card label.

*__export__*: default

*__module__*: trello

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| cards | [TrelloCard](interfaces/trellocard.md)[] |  the cards to be counted |

**Returns:** `Promise`<`object`>
an object containing labels counted up by their occurences

___
<a id="monthly"></a>

### `<Const>` monthly

▸ **monthly**(starting: *`Moment`*, dateTemplate?: *`string`*): `string`

*Defined in [source/file-scripts/filename-templator.ts:30](https://github.com/daniellacosse/accounting-cli/blob/17f3697/source/file-scripts/filename-templator.ts#L30)*

Given a moment date object for the start of the month and, optionally, a template string, returns the filename to be used.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| starting | `Moment` | - |  the start of the month |
| `Default value` dateTemplate | `string` | &quot;MMMM&quot; |  how to format the date |

**Returns:** `string`
The filename to be used.

___
<a id="trelloscriptrunner"></a>

###  trelloScriptRunner

▸ **trelloScriptRunner**(command: *`string`*): `Promise`<`string` \| `object`>

*Defined in [source/trello-scripts/index.ts:16](https://github.com/daniellacosse/accounting-cli/blob/17f3697/source/trello-scripts/index.ts#L16)*

Takes a supported trello command, runs that function, and returns the result.

*__export__*: default

*__module__*: trello

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| command | `string` |  The command that this script runner will run. |

**Returns:** `Promise`<`string` \| `object`>
A promise containing the results

___
<a id="weekly"></a>

### `<Const>` weekly

▸ **weekly**(starting: *`Moment`*, dateTemplate?: *`string`*): `string`

*Defined in [source/file-scripts/filename-templator.ts:12](https://github.com/daniellacosse/accounting-cli/blob/17f3697/source/file-scripts/filename-templator.ts#L12)*

Given a moment date object for the start of the week and, optionally, a template string, returns the filename to be used.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| starting | `Moment` | - |  the start of the week |
| `Default value` dateTemplate | `string` | &quot;M-D&quot; |  how to format the date |

**Returns:** `string`
The filename to be used.

___


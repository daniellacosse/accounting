[Accounting CLI](../README.md) > [TrelloRollup](../classes/trellorollup.md)

# Class: TrelloRollup

A roll-up of TrelloCards by completion count.

*__module__*: trello

*__class__*: TrelloRollup

## Hierarchy

**TrelloRollup**

## Index

### Constructors

* [constructor](trellorollup.md#constructor)

### Methods

* [addCompletedCard](trellorollup.md#addcompletedcard)
* [addUncompletedCard](trellorollup.md#adduncompletedcard)
* [toString](trellorollup.md#tostring)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TrelloRollup**(completed?: *`number`*, total?: *`number`*): [TrelloRollup](trellorollup.md)

*Defined in [source/trello-scripts/label-rollup.ts:22](https://github.com/daniellacosse/accounting-cli/blob/fe32054/source/trello-scripts/label-rollup.ts#L22)*

Creates an instance of TrelloRollup.

*__memberof__*: TrelloRollup

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` completed | `number` | 0 |
| `Default value` total | `number` | 0 |

**Returns:** [TrelloRollup](trellorollup.md)

___

## Methods

<a id="addcompletedcard"></a>

###  addCompletedCard

▸ **addCompletedCard**(): `void`

*Defined in [source/trello-scripts/label-rollup.ts:51](https://github.com/daniellacosse/accounting-cli/blob/fe32054/source/trello-scripts/label-rollup.ts#L51)*

count a completed card

*__memberof__*: TrelloRollup

**Returns:** `void`
n/a

___
<a id="adduncompletedcard"></a>

###  addUncompletedCard

▸ **addUncompletedCard**(): `void`

*Defined in [source/trello-scripts/label-rollup.ts:41](https://github.com/daniellacosse/accounting-cli/blob/fe32054/source/trello-scripts/label-rollup.ts#L41)*

count an uncompleted card

*__memberof__*: TrelloRollup

**Returns:** `void`
n/a

___
<a id="tostring"></a>

###  toString

▸ **toString**(): `string`

*Defined in [source/trello-scripts/label-rollup.ts:62](https://github.com/daniellacosse/accounting-cli/blob/fe32054/source/trello-scripts/label-rollup.ts#L62)*

convert the TrelloRollup to a string

*__memberof__*: TrelloRollup

**Returns:** `string`
the formatted string

___


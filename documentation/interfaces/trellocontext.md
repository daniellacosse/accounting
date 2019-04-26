[Accounting CLI](../README.md) > [TrelloContext](../interfaces/trellocontext.md)

# Interface: TrelloContext

Context required for trello reset to remove and construct new cards

*__module__*: trello

*__interface__*: TrelloContext

## Hierarchy

**TrelloContext**

## Index

### Properties

* [boardID](trellocontext.md#boardid)
* [templates](trellocontext.md#templates)
* [trello](trellocontext.md#trello)

---

## Properties

<a id="boardid"></a>

###  boardID

**● boardID**: *`string`*

*Defined in [types/TrelloContext.d.ts:14](https://github.com/daniellacosse/accounting-cli/blob/d229964/types/TrelloContext.d.ts#L14)*

The identifier of the board to work with

*__type__*: {string}

*__memberof__*: TrelloContext

___
<a id="templates"></a>

###  templates

**● templates**: *[TrelloTemplate](trellotemplate.md)[]*

*Defined in [types/TrelloContext.d.ts:22](https://github.com/daniellacosse/accounting-cli/blob/d229964/types/TrelloContext.d.ts#L22)*

Templates of cards to be created

*__type__*: {TrelloTemplate\[\]}

*__memberof__*: TrelloContext

___
<a id="trello"></a>

###  trello

**● trello**: *`any`*

*Defined in [types/TrelloContext.d.ts:30](https://github.com/daniellacosse/accounting-cli/blob/d229964/types/TrelloContext.d.ts#L30)*

The api object to use in deleting/creating cards.

*__type__*: {\*}

*__memberof__*: TrelloContext

___


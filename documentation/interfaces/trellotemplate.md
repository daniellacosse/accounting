[Accounting CLI](../README.md) > [TrelloTemplate](../interfaces/trellotemplate.md)

# Interface: TrelloTemplate

A template for a new, multi-list trello card

*__module__*: trello

*__interface__*: TrelloTemplate

## Hierarchy

**TrelloTemplate**

## Index

### Properties

* [checklist](trellotemplate.md#checklist)
* [labelNames](trellotemplate.md#labelnames)
* [listNames](trellotemplate.md#listnames)
* [name](trellotemplate.md#name)
* [startTime](trellotemplate.md#starttime)

---

## Properties

<a id="checklist"></a>

### `<Optional>` checklist

**● checklist**: *`string`[]*

*Defined in source/trello-scripts/types/TrelloTemplate.d.ts:47*

List of items to be completed on the card.

*__type__*: {string\[\]}

*__memberof__*: TrelloTemplate

___
<a id="labelnames"></a>

### `<Optional>` labelNames

**● labelNames**: *`string`[]*

*Defined in source/trello-scripts/types/TrelloTemplate.d.ts:30*

The display names of the labels (if any) that are to be added to each instance of the card

*__type__*: {string\[\]}

*__memberof__*: TrelloTemplate

___
<a id="listnames"></a>

###  listNames

**● listNames**: *`string`[]*

*Defined in source/trello-scripts/types/TrelloTemplate.d.ts:22*

The display names of the lists that this card should be added to

*__type__*: {string\[\]}

*__memberof__*: TrelloTemplate

___
<a id="name"></a>

###  name

**● name**: *`string`*

*Defined in source/trello-scripts/types/TrelloTemplate.d.ts:14*

The display text of the card

*__type__*: {string}

*__memberof__*: TrelloTemplate

___
<a id="starttime"></a>

###  startTime

**● startTime**: *`string`*

*Defined in source/trello-scripts/types/TrelloTemplate.d.ts:39*

The due date of the card (effectively, due to chronofy integration, this basically becomes the "startTime")

*__type__*: {string}

*__memberof__*: TrelloTemplate

___


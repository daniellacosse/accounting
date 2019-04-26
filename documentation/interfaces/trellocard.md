[Accounting CLI](../README.md) > [TrelloCard](../interfaces/trellocard.md)

# Interface: TrelloCard

JSON interface for a card as returned from the trello API.

*__module__*: trello

*__interface__*: TrelloCard

## Hierarchy

**TrelloCard**

## Index

### Properties

* [due](trellocard.md#due)
* [dueComplete](trellocard.md#duecomplete)
* [id](trellocard.md#id)
* [idChecklists](trellocard.md#idchecklists)
* [labels](trellocard.md#labels)

---

## Properties

<a id="due"></a>

###  due

**● due**: *`string`*

*Defined in [types/TrelloCard.d.ts:22](https://github.com/daniellacosse/accounting-cli/blob/79da2fe/types/TrelloCard.d.ts#L22)*

The date at which the card is due.

*__type__*: {string}

*__memberof__*: TrelloCard

___
<a id="duecomplete"></a>

###  dueComplete

**● dueComplete**: *`boolean`*

*Defined in [types/TrelloCard.d.ts:30](https://github.com/daniellacosse/accounting-cli/blob/79da2fe/types/TrelloCard.d.ts#L30)*

Whether or not the card is completed.

*__type__*: {boolean}

*__memberof__*: TrelloCard

___
<a id="id"></a>

###  id

**● id**: *`string`*

*Defined in [types/TrelloCard.d.ts:14](https://github.com/daniellacosse/accounting-cli/blob/79da2fe/types/TrelloCard.d.ts#L14)*

The identifier of the card in trello.

*__type__*: {string}

*__memberof__*: TrelloCard

___
<a id="idchecklists"></a>

### `<Optional>` idChecklists

**● idChecklists**: *`string`[]*

*Defined in [types/TrelloCard.d.ts:46](https://github.com/daniellacosse/accounting-cli/blob/79da2fe/types/TrelloCard.d.ts#L46)*

A list of checklists attached to this card.

*__type__*: {TrelloChecklist}

*__memberof__*: TrelloCard

___
<a id="labels"></a>

###  labels

**● labels**: *[TrelloLabel](trellolabel.md)[]*

*Defined in [types/TrelloCard.d.ts:38](https://github.com/daniellacosse/accounting-cli/blob/79da2fe/types/TrelloCard.d.ts#L38)*

A list of labels associated with the card.

*__type__*: {TrelloLabel\[\]}

*__memberof__*: TrelloCard

___


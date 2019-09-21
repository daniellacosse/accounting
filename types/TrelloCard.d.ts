/**
 * JSON interface for a card as returned from the trello API.
 *
 * @module trello
 * @interface TrelloCard
 */
interface TrelloCard {
  /**
   * The identifier of the card in trello.
   *
   * @type {string}
   * @memberof TrelloCard
   */
  id: string;

  /**
   * The date at which the card is due.
   *
   * @type {string}
   * @memberof TrelloCard
   */
  due: string;

  /**
   * Whether or not the card is completed.
   *
   * @type {boolean}
   * @memberof TrelloCard
   */
  dueComplete: boolean;

  /**
   * A list of labels associated with the card.
   *
   * @type {TrelloLabel[]}
   * @memberof TrelloCard
   */
  labels: TrelloLabel[];

  /**
   * A list of checklists attached to this card.
   *
   * @type {TrelloChecklist}
   * @memberof TrelloCard
   */
  checklists: TrelloChecklist[];
}

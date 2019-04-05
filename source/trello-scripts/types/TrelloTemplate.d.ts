/**
 * A template for a new, multi-list trello card
 *
 * @module trello
 * @interface TrelloTemplate
 */
interface TrelloTemplate {
  /**
   * The display text of the card
   *
   * @type {string}
   * @memberof TrelloTemplate
   */
  name: string;

  /**
   * The display names of the lists that this card should be added to
   *
   * @type {string[]}
   * @memberof TrelloTemplate
   */
  listNames: string[];

  /**
   * The display names of the labels (if any) that are to be added to each instance of the card
   *
   * @type {string[]}
   * @memberof TrelloTemplate
   */
  labelNames?: string[];

  /**
   * The due date of the card (effectively, due to chronofy integration,
   * this basically becomes the "startTime")
   *
   * @type {string}
   * @memberof TrelloTemplate
   */
  startTime: string;

  /**
   * List of items to be completed on the card.
   *
   * @type {string[]}
   * @memberof TrelloTemplate
   */
  checklist?: string[];
}

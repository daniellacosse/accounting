/**
 * A card label as returned from the trello API
 *
 * @module trello
 * @interface TrelloLabel
 */
interface TrelloLabel {
  /**
   * The ID of the trello Label
   *
   * @type {string}
   * @memberof TrelloLabel
   */
  id: string;

  /**
   * The display name of the label
   *
   * @type {string}
   * @memberof TrelloLabel
   */
  name: string;
}

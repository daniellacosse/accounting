/**
 * A list of trello cards on a trello board as returned from the Trello API
 *
 * @module trello
 * @interface TrelloList
 */
interface TrelloList {
  /**
   * The ID of the list as returned by the trello API
   *
   * @type {string}
   * @memberof TrelloList
   */
  id: string;

  /**
   * The display name of the list
   *
   * @type {string}
   * @memberof TrelloList
   */
  name: string;
}

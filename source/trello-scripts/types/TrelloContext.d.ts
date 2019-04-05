/**
 * Context required for trello reset to remove and construct new cards
 *
 * @module trello
 * @interface TrelloContext
 */
interface TrelloContext {
  /**
   * The identifier of the board to work with
   *
   * @type {string}
   * @memberof TrelloContext
   */
  boardID: string;

  /**
   * Templates of cards to be created
   *
   * @type {TrelloTemplate[]}
   * @memberof TrelloContext
   */
  templates: TrelloTemplate[];

  /**
   * The api object to use in deleting/creating cards.
   *
   * @type {*}
   * @memberof TrelloContext
   */
  trello: any; // TODO: strictly type this
}

/**
 * An orderable set of objects
 *
 * @interface Ordinable
 */
interface Ordinable {
  /**
   * name of the object
   *
   * @type {string}
   * @memberof Ordinable
   */
  name: string;

  /**
   * position of the object in the list order
   *
   * @type {number}
   * @memberof Ordinable
   */
  pos: number;
}

/**
 * a task that may or may not be completed
 *
 * @interface TrelloChecklistItem
 * @extends {Ordinable}
 */
interface TrelloChecklistItem extends Ordinable {
  /**
   * the completion status of the checklist item
   *
   * @type {("complete" | "incomplete")}
   * @memberof TrelloChecklistItem
   */
  state: "complete" | "incomplete";
}

/**
 * a list of tasks or items to be completed
 *
 * @interface TrelloChecklist
 * @extends {Ordinable}
 */
interface TrelloChecklist extends Ordinable {
  /**
   * the list of items to be completed
   *
   * @type {TrelloChecklistItem[]}
   * @memberof TrelloChecklist
   */
  checkItems: TrelloChecklistItem[];
}

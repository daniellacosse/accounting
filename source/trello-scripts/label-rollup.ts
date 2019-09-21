/**
 * A roll-up of TrelloCards by completion count.
 *
 * @module trello
 * @class TrelloRollup
 */
class TrelloRollup {
  /**
   *  The number of completed TrelloCards.
   *
   * @type {number}
   * @memberof TrelloRollup
   */
  private completed: number;

  /**
   * The total number of TrelloCards.
   *
   * @type {number}
   * @memberof TrelloRollup
   */
  private total: number;

  /**
   *Creates an instance of TrelloRollup.
   * @param {number} [completed=0] the number of completed cards to start with (defaults to zero)
   * @param {number} [total=0] the total number of cards (defaults to zero)
   * @memberof TrelloRollup
   */
  public constructor(completed: number = 0, total: number = 0) {
    this.completed = completed;
    this.total = total;
  }

  /**
   * count an uncompleted card
   *
   * @returns {void} n/a
   * @memberof TrelloRollup
   */
  public addUncompletedItems(amount: number = 1): void {
    this.total += amount;
  }

  /**
   * count a completed card
   *
   * @returns {void} n/a
   * @memberof TrelloRollup
   */
  public addCompletedItems(amount: number = 1): void {
    this.total += amount;
    this.completed += amount;
  }

  /**
   * convert the TrelloRollup to a string
   *
   * @returns {string} the formatted string
   * @memberof TrelloRollup
   */
  public toString(): string {
    return `${this.completed}/${this.total}`;
  }
}

/**
 * Counts up the provided cards and returns an object representing the total number of cards
 * completed against each card label.
 *
 * @export default
 * @module trello
 * @param {TrelloCard[]} cards the cards to be counted
 * @returns {Promise<object>} an object containing labels counted up by their occurences
 */
export default async function labelRollup(
  cards: TrelloCard[]
): Promise<{ [label: string]: string }> {
  const rollups: { [labelName: string]: TrelloRollup } = {};

  cards.forEach(({ labels, dueComplete, checklists }) => {
    const items = checklists.flatMap(({ checkItems }) => checkItems);
    const completedItemCount = items.filter(({ state }) => state === "complete")
      .length;
    const uncompletedItemCount = items.length - completedItemCount;

    labels.forEach(({ name }) => {
      if (!rollups[name]) {
        rollups[name] = new TrelloRollup();
      }

      if (items.length && dueComplete) {
        rollups[name].addCompletedItems(completedItemCount);
        rollups[name].addUncompletedItems(uncompletedItemCount);
      } else {
        dueComplete
          ? rollups[name].addCompletedItems()
          : rollups[name].addUncompletedItems();
      }
    });
  });

  const result: { [label: string]: string } = {};

  for (const labelName in rollups) {
    if (rollups[labelName]) {
      result[labelName] = rollups[labelName].toString();
    }
  }

  return Promise.resolve(result);
}

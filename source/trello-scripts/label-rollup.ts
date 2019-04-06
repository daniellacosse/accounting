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
  public addUncompletedCard(): void {
    this.total += 1;
  }

  /**
   * count a completed card
   *
   * @returns {void} n/a
   * @memberof TrelloRollup
   */
  public addCompletedCard(): void {
    this.total += 1;
    this.completed += 1;
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

  cards.forEach(({ labels, dueComplete }) => {
    labels.forEach(({ name }) => {
      if (!rollups[name]) {
        rollups[name] = new TrelloRollup();
      }

      dueComplete
        ? rollups[name].addCompletedCard()
        : rollups[name].addUncompletedCard();
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

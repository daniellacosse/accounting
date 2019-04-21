import Trello from "trello";
import boardReset from "./board-reset";
import creds from "configuration/credentials.yml";
import labelRollup from "./label-rollup";
import { occurredInTheLastWeek } from "./occurred-since";
import thisWeekConfig from "configuration/schedule.yml";

/**
 * Takes a supported trello command, runs that function, and returns the result.
 *
 * @export default
 * @module trello
 * @param {string} command The command that this script runner will run.
 * @returns {Promise<string | Map<string, string>>} A promise containing the results
 */
export default async function trelloScriptRunner(
  command: string
): Promise<string | { [label: string]: string }> {
  const context: TrelloContext = {
    boardID: thisWeekConfig.boardID,
    templates: thisWeekConfig.templates.sort(
      (t1, t2) => t1.startTime > t2.startTime
    ),
    trello: new Trello(creds.trello.key, creds.trello.token)
  };

  // (1) get the cards from the "This Week" board
  const thisWeekRawCards: TrelloCard[] = await context.trello.getCardsOnBoard(
    thisWeekConfig.boardID
  );

  // (2) only look at the cards from the last 7 days
  const lastWeeksCards: TrelloCard[] = thisWeekRawCards.filter(
    occurredInTheLastWeek
  );

  switch (command) {
    case "rollup":
      return labelRollup(lastWeeksCards);
    case "reset":
      return boardReset(lastWeeksCards, context);
    default:
      return Promise.reject(`
        ${command} is not an appropriate command parameter -
        try \`yarn start trello:rollup\`
      `);
  }
}

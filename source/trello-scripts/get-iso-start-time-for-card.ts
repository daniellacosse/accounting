import moment from "moment";

/**
 * Generates the appropriate ISOString for the day and time on the Trello objects provided.
 *
 * @export default
 * @module trello
 * @param {TrelloTemplate} cardTemplate - the card we're currently creating.
 * @param {TrelloList} dayList - the day of the week list that this card belongs to.
 * @returns {string} - the start time as an ISO string.
 */
export default function getISOStartTimeForCard(
  cardTemplate: TrelloTemplate,
  dayList: TrelloList
): string {
  const [hour, minute] = cardTemplate.startTime.split(":").map(Number);

  const dueDate: moment.Moment = moment()
    .day(dayList.name)
    .startOf("day"); // the lists are named after the days of the week

  return dueDate.set({ hour, minute }).toISOString();
}

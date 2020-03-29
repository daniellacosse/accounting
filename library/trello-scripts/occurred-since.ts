import constants from "../../configuration/constants.yml";
import moment from "moment";

/**
 * Function factory for filter functions that determine if a trello card was due in a certain
 * time window.
 *
 * @export default
 * @module trello
 * @param {number} days The length of the time window since the current date in days.
 * @returns {function(TrelloCard): boolean} The filter function generated to be run against
 * relevant trello cards.
 */
export default function hasOccurredIn(
  days: number
): (card: TrelloCard) => boolean {
  return ({ due }) => {
    const sevenDaysAgo: moment.Moment = moment()
      .day(-1 * days)
      .startOf("day");

    const today: moment.Moment = moment().startOf("day");

    return moment(due).isBetween(sevenDaysAgo, today);
  };
}

/**
 * @private
 *
 * Same as `hasOccuredIn()` - but sets the window of time to check to a week
 */
export const occurredInTheLastWeek = hasOccurredIn(
  constants.LENGTH_OF_WEEK_IN_DAYS
);

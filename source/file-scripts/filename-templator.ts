import moment from "moment"; // eslint-disable-line no-unused-vars

/**
 * Given a moment date object for the start of the week and, optionally, a template string,
 * returns the filename to be used.
 *
 * @export fileTemplator.weekly
 * @param {moment.Moment} starting the start of the week
 * @param {string} dateTemplate how to format the date
 * @returns {string} The filename to be used.
 */
export const weekly = (
  starting: moment.Moment,
  dateTemplate: string = "M-D"
): string =>
  `week-of-${starting.format(dateTemplate)}-to-${starting
    .add(1, "weeks")
    .subtract(1, "day")
    .format(dateTemplate)}`;

/**
 * Given a moment date object for the start of the month and, optionally, a template string,
 * returns the filename to be used.
 *
 * @export fileTemplator.monthly
 * @param {moment.Moment} starting the start of the month
 * @param {string} dateTemplate how to format the date
 * @returns {string} The filename to be used.
 */
export const monthly = (
  starting: moment.Moment,
  dateTemplate: string = "MMMM"
): string => starting.format(dateTemplate);

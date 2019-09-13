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

/**
 * Given a moment date object, returns the trimester that respective month falls into.
 *
 * @export fileTemplator.trimesterly
 * @param {moment.Moment} monthObject date containing the month to be converted
 * @returns {string} the trimester's filename
 */
export const trimesterly = (monthObject: moment.Moment): string => {
  switch (monthObject.month()) {
    case 0:
    case 1:
    case 2:
    case 3:
      return "T1";
    case 4:
    case 5:
    case 6:
    case 7:
      return "T2";
    case 8:
    case 9:
    case 10:
    case 11:
      return "T3";
  }
};

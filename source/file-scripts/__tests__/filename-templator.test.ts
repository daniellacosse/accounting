import moment from "moment";

import { monthly, weekly, trimesterly } from "../filename-templator";

const testString = "1970-01-15T05:00:00.000Z";

test("generates valid week string", () => {
  const expectedResult = "week-of-1-15-to-1-21";

  const testDate = moment(testString);

  expect(weekly(testDate)).toBe(expectedResult);
});

test(`generates valid month string`, () => {
  const expectedResult = "January";

  const testDate = moment(testString);

  expect(monthly(testDate)).toBe(expectedResult);
});

test("respects given date template", () => {
  const expectedResult = "week-of-1970-15-1-to-1970-21-1";

  const testDate = moment(testString);
  const testTemplate = "Y-D-M";

  expect(weekly(testDate, testTemplate)).toBe(expectedResult);
});

const testStringT2 = "1970-04-15T05:00:00.000Z";
const testStringT3 = "1970-12-15T05:00:00.000Z";

test("generates valid trimester", () => {
  const expectedResult = "T1";
  const expectedResultT2 = "T2";
  const expectedResultT3 = "T3";

  const testDate = moment(testString);
  const testDateT2 = moment(testStringT2);
  const testDateT3 = moment(testStringT3);

  expect(trimesterly(testDate)).toBe(expectedResult);
  expect(trimesterly(testDateT2)).toBe(expectedResultT2);
  expect(trimesterly(testDateT3)).toBe(expectedResultT3);
});

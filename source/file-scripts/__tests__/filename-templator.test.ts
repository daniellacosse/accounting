import test from "ava";
import moment from "moment";

import { monthly, weekly } from "../filename-templator";

const testString = "1970-01-15T05:00:00.000Z";

test("generates valid week string", t => {
  const expectedResult = "week-of-1-15-to-1-21";

  const testDate = moment(testString);

  t.is(weekly(testDate), expectedResult);
});

test(`generates valid month string`, t => {
  const expectedResult = "January";

  const testDate = moment(testString);

  t.is(monthly(testDate), expectedResult);
});

test("respects given date template", t => {
  const expectedResult = "week-of-1970-15-1-to-1970-21-1";

  const testDate = moment(testString);
  const testTemplate = "Y-D-M";

  t.is(weekly(testDate, testTemplate), expectedResult);
});

import moment from "moment";

import getISOStartTimeForCard from "../get-iso-start-time-for-card";

test(`correctly gets ISO start time for the card`, () => {
  const thursday = "Thursday";

  const testTemplate: TrelloTemplate = {
    listNames: [thursday],
    name: "Test Card",
    startTime: "09:30"
  };

  const testList: TrelloList = {
    id: "123",
    name: thursday
  };

  const expectedHour = 9;
  const expectedMinutes = 30;

  expect(getISOStartTimeForCard(testTemplate, testList)).toBe(
    moment()
      .day(thursday)
      .add(1, "week")
      .hour(expectedHour)
      .minute(expectedMinutes)
      .startOf("minute")
      .toISOString()
  );
});

test(`correctly gets the ISO start time for Sunday`, () => {
  const sunday = "Sunday";

  const testTemplate: TrelloTemplate = {
    listNames: [sunday],
    name: "Test Card",
    startTime: "09:30"
  };

  const testList: TrelloList = {
    id: "123",
    name: sunday
  };

  const expectedHour = 9;
  const expectedMinutes = 30;

  expect(getISOStartTimeForCard(testTemplate, testList)).toBe(
    moment()
      .day(sunday)
      .hour(expectedHour)
      .minute(expectedMinutes)
      .startOf("minute")
      .toISOString()
  );
});

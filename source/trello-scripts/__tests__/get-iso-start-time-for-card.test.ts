import moment from "moment";

import getISOStartTimeForCard from "../get-iso-start-time-for-card";

const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

test(`correctly gets ISO start time for the card`, () => {
  const yesterday =
    daysOfTheWeek[
      moment()
        .subtract(1, "days")
        .day()
    ];

  const testTemplate: TrelloTemplate = {
    listNames: [yesterday],
    name: "Test Card",
    startTime: "09:30"
  };

  const testList: TrelloList = {
    id: "123",
    name: yesterday
  };

  const expectedHour = 9;
  const expectedMinutes = 30;

  expect(getISOStartTimeForCard(testTemplate, testList)).toBe(moment()
    .add(1, "week")
    .subtract(1, "day")
    .hour(expectedHour)
    .minute(expectedMinutes)
    .startOf("minute")
    .toISOString());
});

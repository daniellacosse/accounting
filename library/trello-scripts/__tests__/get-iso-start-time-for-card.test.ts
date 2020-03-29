import moment from "moment";

import getISOStartTimeForCard from "../get-iso-start-time-for-card";

test.concurrent(`correctly gets the ISO start time for Sunday`, async () => {
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

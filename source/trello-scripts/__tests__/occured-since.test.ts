import moment from "moment";

import constants from "configuration/constants.yml";

import { occurredInTheLastWeek } from "../occurred-since";

test.concurrent(
  `checks if a card correctly occurred in the last week`,
  async () => {
    const testCard: TrelloCard = {
      due: moment()
        .days(-1)
        .startOf("day")
        .toISOString(),
      dueComplete: false,
      id: "123",
      labels: [],
      checklists: []
    };

    const testCard2: TrelloCard = {
      due: moment()
        .days(-1 * (1 + Number(constants.LENGTH_OF_WEEK_IN_DAYS)))
        .startOf("day")
        .toISOString(),
      dueComplete: true,
      id: "456",
      labels: [],
      checklists: []
    };

    expect(occurredInTheLastWeek(testCard)).toBe(true);
    expect(occurredInTheLastWeek(testCard2)).toBe(false);
  }
);

import test from "ava";

import labelRollup from "../label-rollup";

test("properly counts cards", async t => {
  const testLabelOne: TrelloLabel = {
    id: "1",
    name: "label-1"
  };

  const testLabelTwo: TrelloLabel = {
    id: "2",
    name: "label-2"
  };

  const testCards: TrelloCard[] = [
    {
      due: "n/a",
      dueComplete: true,
      id: "123",
      labels: [testLabelOne, testLabelTwo]
    },
    {
      due: "n/a",
      dueComplete: true,
      id: "456",
      labels: [testLabelTwo]
    },
    {
      due: "n/a",
      dueComplete: false,
      id: "789",
      labels: [testLabelOne]
    }
  ];

  const expectedResult = Promise.resolve({
    "label-1": "1/2",
    "label-2": "2/2"
  });

  return Promise.all([labelRollup(testCards), expectedResult]).then(
    ([testResults, expectedResults]) =>
      t.deepEqual(testResults, expectedResults)
  );
});

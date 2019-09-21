import labelRollup from "../label-rollup";

test("properly counts cards", async () => {
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
      labels: [testLabelOne, testLabelTwo],
      checklists: []
    },
    {
      due: "n/a",
      dueComplete: true,
      id: "456",
      labels: [testLabelTwo],
      checklists: [
        {
          name: "checklist1",
          pos: 1,
          checkItems: [
            {
              name: "task1",
              pos: 1,
              state: "complete"
            },
            {
              name: "task2",
              pos: 2,
              state: "incomplete"
            }
          ]
        }
      ]
    },
    {
      due: "n/a",
      dueComplete: false,
      id: "789",
      labels: [testLabelOne],
      checklists: []
    }
  ];

  const expectedResult = Promise.resolve({
    "label-1": "1/2",
    "label-2": "2/3"
  });

  return Promise.all([labelRollup(testCards), expectedResult]).then(
    ([testResults, expectedResults]) =>
      expect(testResults).toEqual(expectedResults)
  );
});

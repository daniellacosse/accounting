import { fake } from "sinon";

import boardReset from "../board-reset";

test("end-to-end smoke test", async () => {
  const mockCards: TrelloCard[] = [
    {
      due: "",
      dueComplete: true,
      id: "123",
      labels: []
    }
  ];

  const mockTemplates: TrelloTemplate[] = [
    {
      listNames: ["testList"],
      name: "testCard",
      startTime: "12:30"
    }
  ];

  const mockList: TrelloList = {
    id: "456",
    name: "testList"
  };

  const mockContext: TrelloContext = {
    boardID: "test",
    templates: mockTemplates,
    trello: {
      addCard: fake.returns(Promise.resolve(mockCards[0])),
      addDueDateToCard: fake.returns(Promise.resolve(mockCards[0])),
      deleteCard: fake(),
      getCard: fake(),
      getLabelsForBoard: fake.returns(Promise.resolve([])),
      getListsOnBoard: fake.returns(Promise.resolve([mockList]))
    }
  };

  const results = await boardReset(mockCards, mockContext);

  const expectedResult = `
    Deleted ${mockCards.length} cards!
    Created ${mockTemplates.length} cards!
  `;

  expect(results).toBe(expectedResult);

  expect(mockContext.trello.addCard.callCount).toBe(mockTemplates.length);
  expect(mockContext.trello.deleteCard.callCount).toBe(mockCards.length);

  expect(mockContext.trello.getCard.callCount).toBe(1);
  expect(mockContext.trello.getListsOnBoard.callCount).toBe(1);
  expect(mockContext.trello.getLabelsForBoard.callCount).toBe(1);
});

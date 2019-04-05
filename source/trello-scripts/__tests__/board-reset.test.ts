import test from "ava";
import { fake } from "sinon";

import boardReset from "../board-reset";

test("end-to-end smoke test", async $ => {
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

  $.is(results, expectedResult);

  $.is(mockContext.trello.addCard.callCount, mockTemplates.length);
  $.is(mockContext.trello.deleteCard.callCount, mockCards.length);

  $.is(mockContext.trello.getCard.callCount, 1);
  $.is(mockContext.trello.getListsOnBoard.callCount, 1);
  $.is(mockContext.trello.getLabelsForBoard.callCount, 1);
});

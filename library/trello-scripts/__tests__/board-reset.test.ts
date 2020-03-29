import { fake } from "sinon";

import boardReset from "../board-reset";

test.concurrent("end-to-end smoke test", async () => {
  const mockLabels: TrelloLabel[] = [
    {
      id: "abc",
      name: "label1"
    }
  ];

  const mockCards: TrelloCard[] = [
    {
      due: "",
      dueComplete: true,
      id: "123",
      labels: [mockLabels[0]],
      checklists: []
    },
    {
      due: "",
      dueComplete: true,
      id: "456",
      labels: [],
      checklists: []
    }
  ];

  const mockTemplates: TrelloTemplate[] = [
    {
      listNames: ["testList"],
      name: "testCard",
      labelNames: ["label1"],
      startTime: "12:30"
    },
    {
      listNames: ["testList"],
      name: "testCard2",
      startTime: "11:00",
      checklist: ["option1", "option2"]
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
      addChecklistToCard: fake.returns(Promise.resolve({ id: "890" })),
      addItemToChecklist: fake.returns(Promise.resolve({ id: "890" })),
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

  const {
    addCard,
    deleteCard,
    getCard,
    addChecklistToCard,
    addItemToChecklist,
    getListsOnBoard,
    getLabelsForBoard
  } = mockContext.trello;

  expect(addCard.callCount).toBe(mockTemplates.length);
  expect(deleteCard.callCount).toBe(mockCards.length);
  expect(getCard.callCount).toBe(mockTemplates.length);

  expect(addChecklistToCard.callCount).toBe(1);
  expect(addItemToChecklist.callCount).toBe(2);
  expect(getListsOnBoard.callCount).toBe(1);
  expect(getLabelsForBoard.callCount).toBe(1);
});

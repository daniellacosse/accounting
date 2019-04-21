import find from "lodash.find";

import getISOStartTimeForCard from "./get-iso-start-time-for-card";

/**
 * Iterates through the cards provided in the given context and deletes them, then going
 * back and replacing them with the cards defined in the `templates.json` file.
 *
 * @export default
 * @module trello
 * @param {TrelloCard[]} existingCards The list of currently existing cards on the board
 * that are to be deleted.
 * @param {TrelloContext} {
 *     trello,
 *     boardID
 *   }
 * @returns {Promise<string>} A promise containing a count of the diff
 * ({deleted, created}) in cards.
 */
export default async function boardReset(
  existingCards: TrelloCard[],
  { boardID, templates, trello }: TrelloContext
): Promise<string> {
  const lists: TrelloList[] = await trello.getListsOnBoard(boardID);
  const labels: TrelloLabel[] = await trello.getLabelsForBoard(boardID);

  const createdCards: TrelloCard[] = [];
  const deletedCards: TrelloCard[] = [];

  for (const card of existingCards) {
    deletedCards.push(await trello.deleteCard(card.id));
  }

  for (const list of lists) {
    for (const template of templates) {
      const cardTemplateDoesNotContainListName: boolean = !(
        typeof template.listNames === "object" &&
        template.listNames.includes(list.name)
      );

      if (cardTemplateDoesNotContainListName) {
        continue;
      }

      // (1) for board lists x card templates, create the initial card
      let createdCard: TrelloCard = await trello.addCard(
        template.name,
        "",
        list.id
      );

      // (2) add the due date to the card
      createdCard = await trello.addDueDateToCard(
        createdCard.id,
        getISOStartTimeForCard(template, list)
      );

      // (3) add the labels to the card
      if (template.labelNames && template.labelNames.length) {
        for (const labelName of template.labelNames) {
          const foundLabel = find(
            labels,
            (lbl: TrelloLabel) => labelName === lbl.name
          );

          if (foundLabel) {
            await trello.addLabelToCard(createdCard.id, foundLabel.id);
          }
        }
      }

      // (4) if there's a checklist, add its contents
      if (template.checklist && template.checklist.length) {
        const createdChecklist = await trello.addChecklistToCard(
          createdCard.id
        );

        for (const todo of template.checklist) {
          await trello.addItemToChecklist(createdChecklist.id, todo);
        }
      }

      // (5) and fetch the final card (in case of caching)
      createdCards.push(await trello.getCard(createdCard.id));
    }
  }

  return Promise.resolve(`
    Deleted ${deletedCards.length} cards!
    Created ${createdCards.length} cards!
  `);
}

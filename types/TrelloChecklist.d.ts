interface Ordinable {
  name: string;
  pos: number;
}

interface TrelloChecklistItem extends Ordinable {
  state: "complete" | "incomplete";
}

interface TrelloChecklist extends Ordinable {
  checkItems: TrelloChecklistItem[];
}

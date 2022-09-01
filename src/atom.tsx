import { atom } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: { TO_DO: ["a", "b", "c"], DOING: ["d", "e"], DONE: ["f"] },
});

import { atom } from "recoil";

export const dataState = atom({
  key: "data",
  default: {},
});

export const selectedColsState = atom({
  key: "selectedCols",
  default: {},
});

export const columnsState = atom({
  key: "columns",
  default: [],
});

export const rowsState = atom({
  key: "rows",
  default: [],
});

export const selectionState = atom({
  key: "selection",
  default: {},
});
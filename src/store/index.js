import { atom } from "recoil";

export const dataState = atom({
  key: "data",
  default: {},
});

export const filesState = atom({
  key: "files",
  default: [],
});

export const selectedColsState = atom({
  key: "selectedCols",
  default: [],
});

export const selectionIndexState = atom({
  key: "selectionIndex",
  default: 0,
});

export const selectedFileIndexState = atom({
  key: "selectedFileIndex",
  default: 0,
});

export const dirHandleState = atom({
  key: "dirHandle",
  default: null,
});

export const dashsState = atom({
  key: "dashs",
  default: [0],
});

export const lengdsState = atom({
  key: "lengds",
  default: [],
});

export const audioSrcState = atom({
  key: "audioSrc",
  default: null,
});

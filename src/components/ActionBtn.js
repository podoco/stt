import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { dataState, dirHandleState } from "../store";

export default function ActionBtn() {
  const data = useRecoilValue(dataState);
  const [dirHandle, setDirHandle] = useRecoilState(dirHandleState);
  const beginFloat = "~begin~float~";
  const endFloat = "~end~float~";
  // const [selectedCols, setSelectedCols] = useRecoilState(selectedColsState);

  async function saveFile(strData) {
    if (dirHandle === null) {
      alert("저장 폴더를 먼저 선택해주세요!");
      return;
    }
    const fileHandle = await dirHandle.getFileHandle(`${data.fileName}.json`, {
      create: true,
    });
    const writableStream = await fileHandle.createWritable({
      keepExistingData: true,
    });
    await writableStream.write(strData);
    await writableStream.close();
    alert("파일이 저장되었습니다.");
  }

  const regexReplacer = function regexReplacer(match, num) {
    return num.includes(".") || Number.isNaN(num) ? num : num + ".0";
  };

  const jsonReplacer = (key, value) => {
    return typeof value === "number"
      ? `${beginFloat}${value}${endFloat}`
      : value;
  };

  const handleSaveClick = () => {
    const dataString = JSON.stringify(data, jsonReplacer, 4);
    const re = new RegExp(`"${beginFloat}(.+?)${endFloat}"`, "g");
    const str = dataString.replace(re, regexReplacer);
    const blob = new Blob([str], { type: "application/json" });
    saveFile(blob);
  };

  async function defineDirHandle() {
    const dirHandle = await window.showDirectoryPicker({ mode: "readwrite" });
    setDirHandle(dirHandle);
  }

  const handleSaveDirectionClick = () => {
    defineDirHandle();
  };

  return (
    <Wrapper>
      <SaveDirectionBtn onClick={handleSaveDirectionClick}>
        저장 폴더 선택
      </SaveDirectionBtn>
      <SaveBtn onClick={handleSaveClick}>파일저장</SaveBtn>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 10%;
  display: flex;
  gap: 13px;
  align-items: center;
  flex-direction: column;
`;

const SaveDirectionBtn = styled.button`
  width: 150px;
  height: 60px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  background-color: #444;
  border-radius: 10px;
  margin-left: 10px;
  color: white;
`;

const SaveBtn = styled.button`
  width: 150px;
  height: 60px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  background-color: #444;
  border-radius: 10px;
  margin-left: 10px;
  color: white;
`;

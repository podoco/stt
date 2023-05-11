import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { dataState, dirHandleState } from "../store";

export default function ActionBtn() {
  const data = useRecoilValue(dataState);
  const [dirHandle, setDirHandle] = useRecoilState(dirHandleState);
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

  const handleSaveClick = () => {
    const dataString = JSON.stringify(data, null, 4);
    const blob = new Blob([dataString], { type: "application/json" });
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

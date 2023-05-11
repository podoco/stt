import React, { useEffect } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { dataState, dirHandleState } from "../store";

export default function ActionBtn() {
  const data = useRecoilValue(dataState);
  const [dirHandle, setDirHandle] = useRecoilState(dirHandleState);

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
      <MergeBtn>병합하기</MergeBtn>
      <AddBtn>오른쪽에 추가</AddBtn>
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
const MergeBtn = styled.button`
  width: 150px;
  height: 60px;
  cursor: pointer;
  margin-top: 15px;
  font-size: 20px;
  font-weight: bold;
  background-color: #0174df;
  border-radius: 15px;
  color: white;

  &:hover {
    background-color: #0174dfcc;
  }
`;
const AddBtn = styled.button`
  width: 150px;
  height: 60px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  background-color: #0174df;
  border-radius: 15px;
  color: white;

  &:hover {
    background-color: #0174dfcc;
  }
`;

const SaveDirectionBtn = styled.button`
  width: 150px;
  height: 60px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  background-color: #0174df;
  border-radius: 15px;
  color: white;

  &:hover {
    background-color: #0174dfcc;
  }
`;

const SaveBtn = styled.button`
  width: 150px;
  height: 60px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  background-color: #0174df;
  border-radius: 15px;
  color: white;

  &:hover {
    background-color: #0174dfcc;
  }
`;

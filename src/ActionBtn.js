import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { dataState } from "./store";

export default function ActionBtn() {
  const [data] = useRecoilState(dataState);

  const handleSaveClick = () => {
    const dataString = JSON.stringify(data, null, 4);
    const blob = new Blob([dataString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${data.fileName}.json`.replace(".json", "");
    link.href = url;
    link.click();
  };

  return (
    <Wrapper>
      <MergeBtn>병합하기</MergeBtn>
      <AddBtn>오른쪽에 추가</AddBtn>
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

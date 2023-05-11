import React from "react";
import styled from "styled-components";
import Sentence from "./Sentence";
import { useRecoilValue } from "recoil";
import { dataState } from "../store";

export default function FileContent() {
  const data = useRecoilValue(dataState);

  return (
    <Wrapper>
      {data &&
        data.transcription &&
        data.transcription.sentences.map((_, index) => (
          <Sentence key={index} number={index} />
        ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 70%;
  margin: 0px 10px;
  padding: 10px;
  gap: 30px;
  border: black;
  border: 0.5px solid gray;
  height: 900px;
  overflow: scroll;
  background: #efefef;
`;

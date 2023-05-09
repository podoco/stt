import React from "react";
import styled from "styled-components";
import Sentence from "./Sentence";

export default function FileContent({ data, setData }) {
  return (
    <Wrapper>
      {data &&
        data.transcription.sentences.map((_, index) => (
          <Sentence
            key={index}
            number={index}
            data={data}
            setData={setData}
          />
        ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 65%;
  margin-left: 15px;
  margin-right: 18px;
  padding: 10px;
  gap: 30px;
  border: black;
  border: 0.5px solid gray;
  height: 900px;
  overflow: scroll;
  background: #efefef;
`;

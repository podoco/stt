import React from "react";
import styled from "styled-components";
import Sentence from "./Sentence";
import { useRecoilState } from "recoil";
import { dataState } from "./store";

export default function FileContent() {
  const [data] = useRecoilState(dataState);
  const leng = data?.transcription?.sentences?.length || 0;
  const dash = [0];
  const lengd = [];
  let accumulatedSegments = 0;
  for (let i = 0; i < leng; i++) {
    const orgStartTime = data.transcription.sentences[i].startTime;
    const orgEndTime = data.transcription.sentences[i].endTime;

    const segments = data.transcription.segments.filter((segment, index) => {
      const segmentStartTime = segment.startTime;
      const segmentEndTime = segment.endTime;
      const isInTimeRange =
        segmentStartTime >= orgStartTime && segmentEndTime <= orgEndTime;
      return isInTimeRange;
    });
    lengd.push(segments.length);
    accumulatedSegments += segments.length;
    dash.push(accumulatedSegments);
  }

  return (
    <Wrapper>
      {data &&
        data.transcription &&
        data.transcription.sentences.map((_, index) => (
          <Sentence key={index} number={index} dash={dash} lengd={lengd} />
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

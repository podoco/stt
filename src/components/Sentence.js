import React from "react";
import styled from "styled-components";
import Datagrid from "./Datagrid";
import AudioPlayer from "./AudioPlayer";
import { useRecoilState } from "recoil";
import { dataState } from "../store";
import { intent, emotion } from "../constants";

const calculateTime = (time) => {
  const seconds = Number(time&&time.split(":")[2]); // 초 추출
  const minutes = Number(time&&time.split(":")[1]); // 분 추출
  const hours = Number(time&&time.split(":")[0]); // 시간 추출
  return (hours * 3600 + minutes * 60 + seconds).toFixed(3);
};

export default function Sentence({ number }) {
  const [data, setData] = useRecoilState(dataState);
  const intentTitle = data.annotation;
  const startTime = calculateTime(
    data.transcription.sentences[number].startTime
  );
  const endTime = calculateTime(data.transcription.sentences[number].endTime);

  const handleTagTypeChange = (target, prop) => {
    const index = target.options.selectedIndex;
    const { title } = prop === "intents" ? intent[index] : emotion[index];
    setData((prevState) => {
      const script = { ...prevState };
      const tags = [...script.annotation[prop]];
      tags[number].tagType = title;
      script.annotation = { ...script.annotation, [prop]: tags };
      return { ...prevState, script };
    });
  };

  return (
    <List>
      <Head>
        <span style={{ display: "flex" }}>
          {number}
          <AudioPlayer startTime={startTime} endTime={endTime} />
          {/* <Time>{startTime}~{endTime}초</Time> */}
        </span>
        <Span>
          <label htmlFor="intent-select">Intent:</label>
          <Select
            onChange={(e) => handleTagTypeChange(e.target, "intents")}
            value={intentTitle.intents[number].tagType}
            id="intent-select"
          >
            {intent.map(({ title, id }) => (
              <option key={id}>{title}</option>
            ))}
          </Select>
        </Span>
        <Span>
          emotion:
          <Select
            onChange={(e) => handleTagTypeChange(e.target, "emotions")}
            value={intentTitle.emotions[number].tagType}
            id="emotion-select"
          >
            {emotion.map(({ title, id }) => (
              <option key={id}>{title}</option>
            ))}
          </Select>
        </Span>
      </Head>
      <Datagrid number={number} />
    </List>
  );
}
const List = styled.div`
  width: 95%;
  height: 490px;
  padding: 20px;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 15px;
  overflow-x: scroll;
  background: lightgray;
`;
const Head = styled.div`
  display: flex;
  padding: 10px;
  font-size: 30px;
  justify-content: space-between;
`;
const Span = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Select = styled.select`
  width: 180px;
  height: 30px;
  font-size: 18px;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-top: 3.5px;
  appearance: none; /* 기본 드롭다운 UI를 제거합니다. */
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='rgb(30,30,30)'><polygon points='0,0 10,0 5,8'/></svg>")
    white no-repeat; /* 파란색 화살표 이미지를 배경으로 추가합니다. */
  background-position: right 10px center; /* 화살표 이미지 위치를 우측 정렬하고, 가운데로 위치하도록 설정합니다. */
  padding-right: 10px; /* 화살표 이미지가 너무 붙어있는 것을 방지하기 위해 padding을 추가합니다. */
`;

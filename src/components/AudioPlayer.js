import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import { audioSrcState, dataState } from "../store";

const calculateTime = (time) => {
  const seconds = Number(time && time.split(":")[2]); // 초 추출
  const minutes = Number(time && time.split(":")[1]); // 분 추출
  const hours = Number(time && time.split(":")[0]); // 시간 추출
  return (hours * 3600 + minutes * 60 + seconds).toFixed(3);
};

export default function AudioPlayer({ number }) {
  const [pausedTime, setPausedTime] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const audioRef = useRef();
  const requestRef = useRef(0);
  const audioSrc = useRecoilValue(audioSrcState);
  const data = useRecoilValue(dataState);

  useEffect(() => {
    setStartTime(
      parseFloat(calculateTime(data.transcription.sentences[number].startTime))
    );
    setEndTime(
      parseFloat(calculateTime(data.transcription.sentences[number].endTime))
    );
    audioRef.current.pause();
    setPausedTime(0);
    setCurrentTime(
      parseFloat(calculateTime(data.transcription.sentences[number].startTime))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const updateTime = () => {
    if (audioRef.current.currentTime >= endTime) {
      audioRef.current.pause();
      cancelAnimationFrame(requestRef.current);
      setPausedTime(0);
      audioRef.current.currentTime = startTime;
      setCurrentTime(startTime);
    } else {
      setCurrentTime(audioRef.current.currentTime);
      requestRef.current = requestAnimationFrame(updateTime);
    }
  };

  const playAudio = () => {
    audioRef.current.src = audioSrc;
    if (!startTime || !endTime) {
      audioRef.current.play();
    } else {
      const currentTime = pausedTime || startTime;
      audioRef.current.currentTime = currentTime;
      audioRef.current.play();
    }
    requestRef.current = requestAnimationFrame(updateTime);
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    setPausedTime(audioRef.current.currentTime);
    cancelAnimationFrame(requestRef.current);
  };

  return (
    <AudioWrapper>
      <StyledFontAwesomeIcon1 icon={faPlay} onClick={playAudio} />
      <StyledFontAwesomeIcon2 icon={faPause} onClick={pauseAudio} />
      <Time>{currentTime && currentTime.toFixed(3)}</Time>
      <audio ref={audioRef} />
    </AudioWrapper>
  );
}
const AudioWrapper = styled.div`
  display: flex;
`;
const StyledFontAwesomeIcon1 = styled(FontAwesomeIcon)`
  color: white;
  width: 25px;
  height: 15px;
  background: gray;
  padding: 10px;
  border-radius: 10px;
  margin-left: 15px;
  margin-right: 5px;
  font-size: 20px;
`;
const StyledFontAwesomeIcon2 = styled(FontAwesomeIcon)`
  color: white;
  width: 25px;
  height: 15px;
  background: gray;
  padding: 10px;
  border-radius: 10px;
  margin-left: 15px;
  margin-right: 5px;
  font-size: 20px;
`;
const Time = styled.span`
  width: 100px;
  height: 34px;
  background-color: white;
  font-size: 26px;
  margin-left: 6px;
  padding-left: 8px;
  border-radius: 10px;
`;

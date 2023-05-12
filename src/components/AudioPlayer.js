import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import { audioSrcState } from "../store";

export default function AudioPlayer({ startTime, endTime }) {
  const [pausedTime, setPausedTime] = useState();
  const [currentTime, setCurrentTime] = useState();
  const audioRef = useRef();
  const requestRef = useRef(0);
  const audioSrc = useRecoilValue(audioSrcState);

  useEffect(() => {
    try {
      pauseAudio();
      setPausedTime(0);
    } catch {}
    setCurrentTime(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioSrc]);

  const updateTime = () => {
    if (audioRef.current.currentTime >= endTime) {
      audioRef.current.pause();
      audioRef.current.currentTime = startTime;
    }
    setCurrentTime(audioRef.current.currentTime);
    requestRef.current = requestAnimationFrame(updateTime);
  };

  const playAudio = () => {
    audioRef.current.src = audioSrc;
    if (!startTime || !endTime) {
      audioRef.current.play();
    } else {
      const currentTime = pausedTime || startTime;
      audioRef.current.currentTime = currentTime;
      audioRef.current.play();
      audioRef.current.addEventListener("timeupdate", () => {
        if (audioRef.current.currentTime >= endTime) {
          audioRef.current.pause();
          audioRef.current.currentTime = startTime;
        }
      });
    }
    requestRef.current = requestAnimationFrame(updateTime);
  };

  const pauseAudio = () => {
    try {
      audioRef.current.pause();
    } catch {}
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

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  dataState,
  filesState,
  selectedFileIndexState,
  dashsState,
  lengdsState,
  audioSrcState,
} from "../store";

export default function File() {
  const setData = useSetRecoilState(dataState);
  const setSelectedFileIndex = useSetRecoilState(selectedFileIndexState);
  const setDashs = useSetRecoilState(dashsState);
  const setLengds = useSetRecoilState(lengdsState);
  const setAudioSrc = useSetRecoilState(audioSrcState);
  const files = useRecoilValue(filesState);
  const [prevIndex, setPrevIndex] = useState();
  const fileReader = new FileReader();
  const itemRef = useRef(null);
  const [errors, setErorrs] = useState([]);

  const changeSelectedItemStyle = (prev, current) => {
    let parent = itemRef.current;
    if (parent !== null && parent.childNodes[current])
      parent.childNodes[current].style.backgroundColor = "rgb(220, 220, 220)";
    if (
      parent !== null &&
      parent.childNodes[prev] &&
      errors.indexOf(prev) === -1
    )
      parent.childNodes[prev].style.backgroundColor = "rgb(239, 239, 239)";
  };

  const changeErrorItemStyle = (current) => {
    let parent = itemRef.current;
    if (parent !== null && parent.childNodes[current]) {
      parent.childNodes[current].style.backgroundColor = "rgb(255, 100, 100)";
    }
  };

  const handlePrevClick = () => {
    let currentIndex = prevIndex;
    while (true) {
      currentIndex -= 1;
      if (errors.indexOf(currentIndex) === -1) break;
    }
    if (0 <= currentIndex) {
      setPrevIndex(currentIndex);
      changeSelectedItemStyle(prevIndex, currentIndex);
      setSelectedFileIndex(currentIndex);
      setPrevIndex(currentIndex);
      fileReaderLoad(currentIndex);
      audioFiletoSrc(currentIndex);
    }
  };

  const handleNextClick = () => {
    let currentIndex = prevIndex;
    while (true) {
      currentIndex += 1;
      if (errors.indexOf(currentIndex) === -1) break;
    }
    if (currentIndex < files.length) {
      setPrevIndex(currentIndex);
      changeSelectedItemStyle(prevIndex, currentIndex);
      setSelectedFileIndex(currentIndex);
      setPrevIndex(currentIndex);
      fileReaderLoad(currentIndex);
      audioFiletoSrc(currentIndex);
    }
  };

  const handleFileClick = (event) => {
    let selectedIndex = parseInt(event.target.getAttribute("data-key"));
    if (errors.indexOf(selectedIndex) !== -1) return 0;
    if (errors.indexOf(prevIndex) === -1)
      event.target.parentNode.childNodes[prevIndex].style.backgroundColor =
        "rgb(239, 239, 239)";
    event.target.style.backgroundColor = "rgb(220, 220, 220)";
    setSelectedFileIndex(selectedIndex);
    setPrevIndex(selectedIndex);
    fileReaderLoad(selectedIndex);
    audioFiletoSrc(selectedIndex);
  };

  const fileReaderLoad = (index) => {
    fileReader.addEventListener("load", (e) => {
      let loadData = JSON.parse(fileReader.result);
      initDashPoint(loadData);
      if (
        loadData.annotation.intents.length !== 0 &&
        loadData.annotation.emotions.length !== 0 &&
        loadData.annotation.grammarTypes !== 0
      )
        setData(loadData);
      else {
        alert(
          `json 파일 내용을 확인해주세요. \n(intents, emotions, grammarTypes) \n 파일명: ${loadData.fileName}`
        );
        setErorrs([...errors, index]);
        changeErrorItemStyle(index);
      }
    });
    fileReader.readAsText(files[index]["json"]);
  };

  const initDashPoint = (data) => {
    const leng = data?.transcription?.sentences?.length || 0;
    const _dashs = [0];
    const _lengds = [];
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
      _lengds.push(segments.length);
      accumulatedSegments += segments.length;
      _dashs.push(accumulatedSegments);
    }

    setDashs(_dashs);
    setLengds(_lengds);
  };

  const audioFiletoSrc = (index) => {
    const urlObj = URL.createObjectURL(files[index]["wav"]);
    setAudioSrc(urlObj);
  };

  useEffect(() => {
    if (files.length !== 0) {
      errors.forEach((file, index) => {
        itemRef.current.childNodes[index].style.backgroundColor =
          "rgb(239, 239, 239)";
      });
      setErorrs([]);
      setSelectedFileIndex(0);
      setPrevIndex(0);
      fileReaderLoad(0);
      audioFiletoSrc(0);
      let prev = prevIndex ? prevIndex : 0;
      changeSelectedItemStyle(prev, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <Wrapper>
      <FileListWrapper>
        <FileListName>파일목록</FileListName>
        <FileList ref={itemRef}>
          {files.map((file, index) => {
            return (
              <FileListItem
                key={index}
                data-key={index}
                onClick={handleFileClick}
              >
                {file.name}
              </FileListItem>
            );
          })}
        </FileList>
      </FileListWrapper>

      <ListBtn>
        <PrevBtn onClick={handlePrevClick}>이전파일</PrevBtn>
        <NextBtn onClick={handleNextClick}>다음파일</NextBtn>
      </ListBtn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 20%;
  height: 920px;
  display: flex;
  flex-direction: column;
`;
const FileListWrapper = styled.div`
  display: flex;
  border: 0.5px solid gray;
  flex-direction: column;
`;

const FileListName = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding-top: 5px;
  height: 35px;
  margin: 0 auto;
  background-color: #333;
  color: white;
`;

const FileList = styled.ul`
  width: 100%;
  height: 750px;
  overflow: auto;
  background: #efefef;
  list-style: none;
  margin: 0 auto;
  padding: 0;
`;

const FileListItem = styled.li`
  cursor: pointer;
  font-size: 20px;
  padding: 10px 5px;
  text-align: center;
`;

const ListBtn = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 25px;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
const PrevBtn = styled.button`
  width: 120px;
  height: 76px;
  cursor: pointer;
  font-size: 25px;
  background-color: #444;
  color: white;
  border-radius: 10px;
`;

const NextBtn = styled.button`
  width: 120px;
  height: 76px;
  font-size: 25px;
  cursor: pointer;
  background-color: #444;
  color: white;
  border-radius: 10px;
`;

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { dataState, filesState } from "../store";

export default function File() {
  const [data, setData] = useRecoilState(dataState);
  const [files, setFiles] = useRecoilState(filesState);
  const [prevIndex, setPrevIndex] = useState();
  const fileReader = new FileReader();
  const itemRef = useRef(null);

  const changeSelectedItemStyle = (prev, current) => {
    let parent = itemRef.current;
    if (
      parent !== null &&
      parent.childNodes[prev] !== undefined &&
      parent.childNodes[current]
    ) {
      parent.childNodes[prev].style.backgroundColor = "rgb(239, 239, 239)";
      parent.childNodes[current].style.backgroundColor = "rgb(220, 220, 220)";
    }
  };

  const handlePrevClick = () => {
    if (prevIndex !== 0) {
      // 스타일 변경

      const currentIndex = prevIndex - 1;
      changeSelectedItemStyle(prevIndex, currentIndex);

      setPrevIndex(currentIndex);
      fileReaderLoad(currentIndex);
    }
  };

  const handleNextClick = () => {
    if (prevIndex < files.length - 1) {
      // 스타일 변경

      const currentIndex = prevIndex + 1;
      changeSelectedItemStyle(prevIndex, currentIndex);

      setPrevIndex(currentIndex);
      fileReaderLoad(currentIndex);
    }
  };

  const handleFileClick = (event) => {
    event.target.parentNode.childNodes[prevIndex].style.backgroundColor =
      "rgb(239, 239, 239)";
    event.target.style.backgroundColor = "rgb(220, 220, 220)";
    let selectedIndex = parseInt(event.target.getAttribute("data-key"));
    setPrevIndex(selectedIndex);
    fileReaderLoad(selectedIndex);
  };

  const fileReaderLoad = (index) => {
    fileReader.addEventListener("load", (e) => {
      let loadData = JSON.parse(fileReader.result);
      setData(loadData);
    });
    fileReader.readAsText(files[index]["json"]);
  };

  useEffect(() => {
    if (files.length !== 0) {
      setPrevIndex(0);
      fileReaderLoad(0);
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
  background-color: #0174df;
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
  width: 135%;
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
  font-size: 28px;
  background-color: #0174df;
  color: white;
  border-radius: 15px;
`;

const NextBtn = styled.button`
  width: 120px;
  height: 76px;
  font-size: 28px;
  cursor: pointer;
  background-color: #0174df;
  color: white;
  border-radius: 15px;
`;
import React from "react";
import styled from "styled-components";
import Subject from "./Subject";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { filesState, dataState } from "../store";

export default function Head() {
  const data = useRecoilValue(dataState);
  const setFiles = useSetRecoilState(filesState);

  const handleLoadChange = (event) => {
    let uploads = event.target.files;
    let pairFiles = [];
    let pairRows = {};

    Array.from(uploads).forEach((upload) => {
      let fileName = upload.name;
      let _fileLen = fileName.length;
      let _lastDot = fileName.lastIndexOf(".");
      let _fileName = fileName.substring(0, _lastDot);
      let _fileExt = fileName.substring(_lastDot + 1, _fileLen);

      // 확장자 검사
      if (_fileExt !== "json" && _fileExt !== "wav") {
        return;
      }

      // 페어 검사
      if (
        _fileName in pairRows &&
        pairRows[_fileName][_fileExt] === undefined
      ) {
        pairRows[_fileName][_fileExt] = upload;
        pairFiles.push(pairRows[_fileName]);
      } else {
        pairRows[_fileName] = {};
        pairRows[_fileName]["name"] = _fileName;
        pairRows[_fileName][_fileExt] = upload;
      }
    });
    setFiles([...pairFiles]);
  };

  const _addDirectory = (node) => {
    if (node) {
      node.directory = true;
      node.webkitdirectory = true;
    }
  };

  return (
    <Wrapper>
      <LoadFilesWrapper>
        <LoadLabel htmlFor="loadFiles">불러오기</LoadLabel>
        <LoadInput
          type="file"
          id="loadFiles"
          onChange={handleLoadChange}
          ref={(node) => _addDirectory(node)}
        ></LoadInput>
      </LoadFilesWrapper>
      <FileName>파일 명: {data && data.fileName}</FileName>
      <Subject />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const LoadFilesWrapper = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadInput = styled.input`
  display: none;
`;

const LoadLabel = styled.label`
  width: 220px;
  height: 70px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  background-color: #0174df;
  border-radius: 15px;
  border: 1px black solid;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FileName = styled.div`
  font-size: 25px;
  width: 70%;
  margin: 0px 10px;
  padding: 10px;
  text-align: center;
`;

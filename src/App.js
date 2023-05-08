import "./App.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Subject from "./Subject";
import FileContent from "./FileContent";
import ActionBtn from "./ActionBtn";
import data from "./data.json";
function App() {
  const [newData, setNewData] = useState(data);
  const [SubTitle, setSubTitle] = useState(data.script.domain);
  const [files, setFiles] = useState({});

  const SaveHandleClick = () => {
    const updatedData = {
      ...newData,
      script: {
        domain: SubTitle,
        transcription: data.transcription,
        annotation: {
          intents: data.annotation.intents.map(({ tagType }) => ({ tagType })),
          emotions: data.annotation.emotions.map(({ tagType }) => ({
            tagType,
          })),
        },
      },
    };

    setNewData(updatedData);

    console.log("File saved: ", updatedData);
  };

  const LoadHandleCilck = () => {
    setFiles();
  };

  const PrevHandleClick = () => {};

  const NextHandleClick = () => {};

  useEffect(() => {
    console.log("file list changed: ", files); // nothing happened
  }, [files]);

  return (
    <Wrapper>
      <Head>
        <LoadFiles onClick={LoadHandleCilck}>불러오기</LoadFiles>
        <FileName>파일 명: {data.fileName}</FileName>
        <Subject SubTitle={SubTitle} setSubTitle={setSubTitle} data={data} />
      </Head>

      <Contents>
        <FileWrapper>
          <FileListWrapper>
            <FileListName>파일목록</FileListName>
            <FieList diaryList={files}></FieList>
          </FileListWrapper>

          <ListBtn>
            <PrevBtn onClick={PrevHandleClick}>이전파일</PrevBtn>
            <NextBtn onClick={NextHandleClick}>다음파일</NextBtn>
          </ListBtn>
        </FileWrapper>

        <FileContent setNewData={setNewData} data={data} />

        <ActionBtn onClick={SaveHandleClick} />
      </Contents>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 85%;
  height: 100%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  padding-left: 30px;
  padding-right: 80px;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const LoadFiles = styled.div`
  width: 220px;
  height: 70px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  background-color: #0174df;
  border-radius: 15px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FileName = styled.div`
  font-size: 25px;
`;
const Contents = styled.div`
  display: flex;
  margin-top: 5px;
`;
const FileWrapper = styled.div`
  width: 18%;
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

const FieList = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 700px;
  overflow: scroll;
  background: #efefef;
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

export default App;

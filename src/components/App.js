import "../css/App.css";
import React from "react";
import styled from "styled-components";
import FileContent from "./FileContent";
import ActionBtn from "./ActionBtn";
import Head from "./Head";
import Files from "./Files";

function App() {
  return (
    <Wrapper>
      <Head />
      <Contents>
        <Files />
        <FileContent />
        <ActionBtn />
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

const Contents = styled.div`
  display: flex;
  margin-top: 5px;
`;

export default App;

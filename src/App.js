import './App.css';
import styled from 'styled-components';

function App() {
  return (
    <Wrapper >
     <Head>
      <LoadBtn>파일 불러오기</LoadBtn>
      <FileName>선택한 파일 명: ㅁㅇㅁㄴㅇasdsadsadsa</FileName>
      <Subject>주제:</Subject>
     </Head>

     <Contents>
      <FileWrapper>
        <FileListWrapper>
          <FileListName>파일목록</FileListName>
          <FieList></FieList>
        </FileListWrapper>
    
        <ListBtn>
          <PrevBtn>이전파일</PrevBtn>
          <NextBtn>다음파일</NextBtn>
        </ListBtn>

      </FileWrapper>

      <FileContent></FileContent>
     
      <ActionBtn>
        <MergeBtn>병합하기</MergeBtn>
        <AddBtn>오른쪽에 추가</AddBtn>
        <SaveBtn>파일저장</SaveBtn>
      </ActionBtn>
     
     </Contents>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width:65%;
  height: 50%;
  margin: 30px auto;
  display: flex;
  flex-direction:column;
`

const Head = styled.div`
  display:flex;
  align-items:center;
  padding-left:35px;
  padding-right:40px;
  margin-bottom:20px;
  justify-content: space-between;
`

const LoadBtn = styled.button`
  width: 200px;
  height:70px;
  font-size: 24px;
  font-weight:bold;
  cursor: pointer;
  background-color:#0174DF;
  border-radius: 15px;
  color:white;
`

const FileName = styled.div`
  font-size:25px;
`

const Subject = styled.div``

const Contents = styled.div`
  display: flex;
  margin-top:5px;
`
const FileWrapper = styled.div`
  width: 20%;
  
  height: 700px;
  display: flex;

  flex-direction:column;
`
const FileListWrapper = styled.div`
  display:flex;
  border: 0.5px solid gray;
  flex-direction:column;
`

const FileContent = styled.div`
  width: 65%;
  margin-left:15px;
  margin-right:18px;
  border: black;
  border: 0.5px solid gray;
  height: 700px;
  overflow: scroll;
  background: #EFEFEF;
`
const FileListName = styled.div`
  width: 100%;
  font-size:24px;
  font-weight:bold;
  text-align:center;
  padding-top:5px;
  height: 35px;
  margin: 0 auto;
  background-color:#0174DF;
  color:white;
`

const FieList = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 540px;
  overflow: scroll;
  background: #EFEFEF;
`

const ListBtn = styled.div`
  display: flex;
  align-items:end;
  justify-content:center;
  gap:25px;
  flex-direction: row;
  width: 100%;
  height: 100%;
  
`
const PrevBtn = styled.button`
  width: 85px;
  height: 76px;
  cursor: pointer;
  font-size: 28px;
  background-color:#0174DF;
  color:white;
  border-radius: 15px;
`

const NextBtn = styled.button`
  width: 85px;
  height: 76px;
  font-size: 28px;
  cursor: pointer;
  background-color:#0174DF;
  color:white;
  border-radius: 15px;
`


const ActionBtn = styled.button`
  width: 15%;
  display: flex;
  gap:13px;
  align-items:center;
  flex-direction:column;
`
const MergeBtn = styled.button`
  width: 150px;
  height:60px;
  cursor: pointer;
  margin-top:15px;
  font-size: 20px;
  font-weight:bold;
  background-color:#0174DF;
  border-radius: 15px;
  color:white;
`
const AddBtn = styled.button`
  width: 150px;
  height:60px;
  cursor: pointer;
  font-size: 20px;
  font-weight:bold;
  background-color:#0174DF;
  border-radius: 15px;
  color:white;
`
const SaveBtn = styled.button`
  width: 150px;
  height:60px;
  cursor: pointer;
  font-size: 20px;
  font-weight:bold;
  background-color:#0174DF;
  border-radius: 15px;
  color:white;
`
export default App;

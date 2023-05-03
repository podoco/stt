import React from 'react'
import styled from 'styled-components';

export default function ActionBtn(props) {
  return (
    <Wrapper>
        <MergeBtn>병합하기</MergeBtn>
        <AddBtn>오른쪽에 추가</AddBtn>
        <SaveBtn onClick={props.onClick}>파일저장</SaveBtn>
      </Wrapper>
  )
}
const Wrapper= styled.button`
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
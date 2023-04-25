import React, { useState } from 'react'
import styled from 'styled-components';
import data from './data.json'
const subjects = [
    {title:"농경"},
    {title:"가족"},
    {title:"의"},
    {title:"식"},
    {title:"주"},
    {title:"자연"},
    {title:"건강"},
    {title:"풍속"},
    {title:"응급상황"}
];


function Subject() {
    const [SubTitle,setSubTitle] = useState(data.script.domain);

    const handleChange = ({ target }) => {
        const index = target.options.selectedIndex;
        const { title } = subjects[index];
        setSubTitle(title);
      };

  return (
    <Wrapper>
    <div>
    주제: 
    </div>
    <div>
    <Select
        onChange={handleChange}
        value={SubTitle}
        id="variation-select"
    >
        {subjects.map(({ title }) => (
            <option>
                {title}
            </option>
        ))}
    </Select>
    </div>

    </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    font-size: 20px;
    align-items: baseline;

`

const Select = styled.select`
  width: 200px;
  height: 30px;
  font-size: 18px;
  text-align:center;
  margin-left:20px;
  appearance: none; /* 기본 드롭다운 UI를 제거합니다. */
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='blue'><polygon points='0,0 10,0 5,5'/></svg>") no-repeat; /* 파란색 화살표 이미지를 배경으로 추가합니다. */
  background-position: right 10px center; /* 화살표 이미지 위치를 우측 정렬하고, 가운데로 위치하도록 설정합니다. */
  padding-right: 30px; /* 화살표 이미지가 너무 붙어있는 것을 방지하기 위해 padding을 추가합니다. */
`;


export default Subject
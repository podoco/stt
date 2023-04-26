import React, { useState }  from 'react'
import styled from 'styled-components';
import Datagrid from './Datagrid';
import AudioPlayer from './AudioPlayer';

const intent = [
    {title:"DES", id:1},
    {title:"EXP", id:2},
    {title:"REP", id:3},
];

const emotion = [
    {title:"irrelevant",id:1},
    {title:"negative",id:2},
    {title:"positive",id:3},
];
const calculateTime = (time) => {
    const seconds = Number(time.split(':')[2]); // 초 추출
    const minutes = Number(time.split(':')[1]); // 분 추출
    const hours = Number(time.split(':')[0]); // 시간 추출
    return (hours * 3600 + minutes * 60 + seconds).toFixed(2);
};

export default function Sentence({number,data}) {
const [intentTitle,setIntentTitle] = useState(data.annotation.intents[number].tagType);
const [emotionTitle,setEmotionTitle] = useState(data.annotation.emotions[number].tagType);
const startTime = calculateTime(data.transcription.sentences[number].startTime);
const endTime = calculateTime(data.transcription.sentences[number].endTime);



const handleIntentChange = ({ target }) => {
    const index = target.options.selectedIndex;
    const { title } = intent[index];
    setIntentTitle(title);
  };
  const handleEmotionChange = ({ target }) => {
    const index = target.options.selectedIndex;
    const { title } = emotion[index];
    setEmotionTitle(title);
  };

  return (
    <List>
        <Head>
        {number}
        <AudioPlayer startTime={startTime} endTime={endTime}/>

        {startTime}초
        Intent:
        <select
        onChange={handleIntentChange}
        value={intentTitle}
        id="intent-select"
        >
        {intent.map(({ title,id }) => (
            <option key={id}>
                {title}
            </option>
        ))}
        </select>
        emotion:
        <select
        onChange={handleEmotionChange}
        value={emotionTitle}
        id="emotion-select"
        >
        {emotion.map(({ title ,id }) => (
            <option key={id}>
                {title}
            </option>
        ))}
        </select>
        </Head>
       {/* <Datagrid/> */}
    </List>
  )
}
const List = styled.div`
    width: 95%;
    height: 300px;
    padding: 20px;
    margin-top:10px;
    margin-left:10px;
    margin-bottom: 15px;
    overflow-x: scroll;
    background: lightgray;
    
`

const Head = styled.div`
    display: flex;
    padding: 10px;
    font-size:30px;
    justify-content:space-between;
`

const Table = styled.div`
    display: flex;
    padding: 10px;
`
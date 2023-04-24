import React, { useState }  from 'react'
import styled from 'styled-components';
import { faPlay,faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const intent = [
    {title:"DES"},
    {title:"EXP"},
    {title:"REP"},
];

const emotion = [
    {title:"irrelevant"},
    {title:"negative"},
    {title:"positive"},
];



export default function Sentence({number,data}) {
const [intentTitle,setIntentTitle] = useState(data.annotation.intents[number].tagType);
const [emotionTitle,setEmotionTitle] = useState(data.annotation.emotions[number].tagType);

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
        <StyledFontAwesomeIcon icon={faPlay} />
        <StyledFontAwesomeIcon icon={faPause} />
        0.005
        Intent:
        <select
        onChange={handleIntentChange}
        value={intentTitle}
        id="intent-select"
        >
        {intent.map(({ title }) => (
            <option>
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
        {emotion.map(({ title }) => (
            <option>
                {title}
            </option>
        ))}
        </select>
        </Head>
        <Table>

        </Table>
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
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: white;
  width: 25px;
  height: 15px;
  background: gray;
  padding: 10px;
  border-radius:10px;
  margin-left:15px;
  margin-right:5px;
  font-size: 20px;
`;
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
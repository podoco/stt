import React from 'react';
import styled from 'styled-components';
import { faPlay,faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      pausedTime: null,
      currentTime:0,
    };
    this.playAudio = this.playAudio.bind(this);
    this.pauseAudio = this.pauseAudio.bind(this);
  }

  playAudio() {
    const { startTime, endTime } = this.props;
    if (!startTime || !endTime) {
      this.audioRef.current.play();
    } else {
      const currentTime = this.state.pausedTime || startTime;
      this.audioRef.current.currentTime = currentTime;
      this.audioRef.current.play();
      this.audioRef.current.addEventListener("timeupdate", () => {
        if (this.audioRef.current.currentTime >= endTime) {
          this.audioRef.current.pause();
          this.audioRef.current.currentTime = startTime;
        }
        this.setState({
          currentTime: this.audioRef.current.currentTime,
        });
      });
    }
  }

  pauseAudio() {
    this.setState({
      pausedTime: this.audioRef.current.currentTime,
    });
    this.audioRef.current.pause();
  }
  render() {
    const { currentTime } = this.state;
    return (
      <AudioWrapper>
        <audio ref={this.audioRef} >
          <source src="/sample.wav" type="audio/wav" />
        </audio>
        <StyledFontAwesomeIcon icon={faPlay} onClick={this.playAudio}/>
        <StyledFontAwesomeIcon icon={faPause}  onClick={this.pauseAudio} />
         <Time>{currentTime.toFixed(2)}</Time>
      </AudioWrapper>
    );
  }
}
const AudioWrapper = styled.div`
  display: flex;
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
const Time = styled.span`
  width: 64px;
  height: 34px;
  background-color:white;
  font-size:26px;
  margin-left:6px;
  padding-left: 8px;
  border-radius:10px;
`
export default AudioPlayer;

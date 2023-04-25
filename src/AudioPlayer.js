import React from 'react';
import styled from 'styled-components';
import { faPlay,faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.playAudio = this.playAudio.bind(this);
    this.pauseAudio = this.pauseAudio.bind(this);

  }

  playAudio() {
    const { startTime, endTime } = this.props;
    if (!startTime || !endTime) {
      this.audioRef.current.play();
    } else {
      this.audioRef.current.currentTime = startTime;
      this.audioRef.current.play();
      this.audioRef.current.addEventListener("timeupdate", () => {
        if (this.audioRef.current.currentTime >= endTime) {
          this.audioRef.current.pause();
          this.audioRef.current.currentTime = startTime;
        }
      });
      alert('play');
    }
  }

  pauseAudio() {
    this.audioRef.current.pause();
  }

  render() {
    return (
      <div>
        <audio ref={this.audioRef} >
          <source src="/sample.wav" type="audio/wav" />
        </audio>
        <button onClick={this.playAudio}>
        <StyledFontAwesomeIcon icon={faPlay} />
        </button>
        <button onClick={this.pauseAudio}>
        <StyledFontAwesomeIcon icon={faPause} />
        </button>
       
      </div>
    );
  }
}
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
export default AudioPlayer;

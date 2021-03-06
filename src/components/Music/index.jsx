import React, { Fragment, useState, useRef } from "react";
import { Play, Pause } from "../../utils/Icons";

const Audio = ({ song }) => {
  const soundPlayer = useRef(null);
  const [audioPlay, setAudioPlay] = useState(false);

  const audioButton = () => {
    soundPlayer.current.volume = 1;
    audioPlay && soundPlayer.current.pause();
    !audioPlay && soundPlayer.current.play();
    setAudioPlay(!audioPlay);
  };

  return (
    <Fragment>
      <span className="navButton playButton" onClick={() => audioButton()}>
        {audioPlay && <Pause />}
        {!audioPlay && <Play />}
      </span>
      <audio
        src={song}
        ref={soundPlayer}
        title="Intro Sounds"
        id="player"
        volume={1}
        autoPlay={audioPlay === "true" && true}
        controls
        loop
      />
    </Fragment>
  );
};

export default Audio;

import { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'

const Audio = ({ audioUrl }) => {
  const audioItemRef = useRef();

  function handlePlay() {
    audioItemRef.current.play();
  }

  return (
    <>
      <audio ref={audioItemRef} src={audioUrl} />
      <button id="icon-button" onClick={handlePlay}><FontAwesomeIcon className="icon" icon={faVolumeHigh} /></button>
    </>
  );
};

export default Audio;

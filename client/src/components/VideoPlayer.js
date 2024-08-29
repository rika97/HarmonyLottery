import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, onThresholdReached, onClose, threshold = 0.9 }) => {
//   const [playedSeconds, setPlayedSeconds] = useState(0);
//   const [duration, setDuration] = useState(0);

  const handleProgress = (progress) => {
    // setPlayedSeconds(progress.playedSeconds);
    // setDuration(progress.loadedDuration || duration);

    onThresholdReached();
    // if (duration > 0 && playedSeconds / duration >= threshold) {
    //   onThresholdReached();
    // }
  };

  return (
    <div className="video-player">
      <ReactPlayer
        url={videoUrl}
        controls
        playing
        onProgress={handleProgress}
        onEnded={handleProgress}
        width="100%"
        height="100%"
      />
      <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>Close</button>
    </div>
  );
};

export default VideoPlayer;

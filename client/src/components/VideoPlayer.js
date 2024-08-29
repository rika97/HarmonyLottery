import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, onThresholdReached, onClose, threshold = 0.9 }) => {
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (duration > 0 && playedSeconds / duration >= threshold) {
      console.log('Threshold reached!');
      onThresholdReached();
    }
  }, [playedSeconds, duration, threshold, onThresholdReached]);

  const handleProgress = (progress) => {
    setPlayedSeconds(progress.playedSeconds);
    setDuration(progress.loadedDuration || duration);
  };

  return (
    <div className="video-player">
      <ReactPlayer
        url={videoUrl}
        controls
        playing
        onProgress={handleProgress}
        onEnded={onClose}
        width="100%"
        height="100%"
      />
      <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>Close</button>
    </div>
  );
};

export default VideoPlayer;

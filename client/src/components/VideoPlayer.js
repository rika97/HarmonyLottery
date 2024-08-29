import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, onThresholdReached, onClose, threshold = 0.9 }) => {
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setDuration(0);
    setPlayedSeconds(0);
  }, [videoUrl]);

  const handleProgress = (progress) => {
    setPlayedSeconds(progress.playedSeconds);

    if (duration > 0 && playedSeconds / duration >= threshold) {
      onThresholdReached();
    }
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  return (
    <div className="video-player" style={{ position: 'relative' }}>
      <ReactPlayer
        url={videoUrl}
        controls
        playing
        onProgress={handleProgress}
        onDuration={handleDuration}
        onEnded={onClose}
        width="100%"
        height="100%"
      />
      <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>Close</button>
      <div>Played Seconds: {playedSeconds}</div>
      <div>Duration: {duration}</div>
    </div>
  );
};

export default VideoPlayer;

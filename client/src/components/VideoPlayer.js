import React, { useState, useCallback } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, onVideoEnd, onThresholdReached, onClose, threshold = 0.9 }) => {
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleProgress = useCallback((progress) => {
    const { playedSeconds, loadedDuration } = progress;

    setPlayedSeconds(playedSeconds);
    setDuration(loadedDuration || duration);

    if (duration > 0 && playedSeconds / duration >= threshold) {
      if (onThresholdReached) onThresholdReached();
    }
  }, [duration, threshold, onThresholdReached]);

  const handleEnded = useCallback(() => {
    if (playedSeconds / duration >= threshold) {
      onVideoEnd(); // Notify parent component
    }
  }, [playedSeconds, duration, threshold, onVideoEnd]);

  return (
    <div className="video-player">
      <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>Close</button>
      <ReactPlayer
        url={videoUrl}
        controls
        playing
        onProgress={handleProgress}
        onEnded={handleEnded}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;

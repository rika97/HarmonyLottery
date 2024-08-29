import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, onThresholdReached, onClose, threshold = 0.9 }) => {
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [watchTime, setWatchTime] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setDuration(0);
    setPlayedSeconds(0);
    setWatchTime(0);
    setLastTime(0);
    setIsPlaying(false);
  }, [videoUrl]);

  const handleProgress = (progress) => {
    const { playedSeconds } = progress;

    setPlayedSeconds(playedSeconds);

    if (isPlaying) {
      const timeIncrement = playedSeconds - lastTime;

      if (timeIncrement > 0) { // Only add positive increments
        setWatchTime((prev) => prev + timeIncrement);
      }
    }

    setLastTime(playedSeconds);

    if (duration > 0 && watchTime / duration >= threshold) {
      onThresholdReached();
    }
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="video-player" style={{ position: 'relative' }}>
      <ReactPlayer
        url={videoUrl}
        controls
        playing
        onProgress={handleProgress}
        onDuration={handleDuration}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={onClose}
        width="100%"
        height="100%"
      />
      <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>Close</button>
      {/* <div>Played Seconds: {playedSeconds}</div>
      <div>Duration: {duration}</div>
      <div>Continuous Watch Time: {watchTime}</div> */}
    </div>
  );
};

export default VideoPlayer;

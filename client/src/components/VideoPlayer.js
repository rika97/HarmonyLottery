import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './VideoPlayer.css';

const VideoPlayer = ({ videoUrl, onThresholdReached, onClose, threshold = 0.9 }) => {
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [watchTime, setWatchTime] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isThresholdReached, setIsThresholdReached] = useState(false);

  useEffect(() => {
    setDuration(0);
    setPlayedSeconds(0);
    setWatchTime(0);
    setLastTime(0);
    setIsPlaying(false);
    setIsThresholdReached(false);
  }, [videoUrl]);

  const handleProgress = (progress) => {
    const { playedSeconds, loadedDuration } = progress;

    setPlayedSeconds(playedSeconds);
    setDuration(loadedDuration);

    if (isPlaying) {
      const timeIncrement = playedSeconds - lastTime;
      
      if (timeIncrement > 0) {
        setWatchTime((prev) => prev + timeIncrement);
      }
    }

    setLastTime(playedSeconds);

    if (duration > 0 && watchTime / duration >= threshold) {
      if (!isThresholdReached) {
        setIsThresholdReached(true);
        onThresholdReached();
      }
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

  const handleEnded = () => {
    if (watchTime / duration < threshold) {
      console.log('Video ended before reaching the threshold.');
    }
    onClose();
  };

  return (
    <div className="video-player-fullscreen">
      <ReactPlayer
        url={videoUrl}
        controls
        playing
        onProgress={handleProgress}
        onDuration={handleDuration}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        width="100%"
        height="100%"
      />
      <button className="close-button" onClick={onClose}>Close</button>
      <div>Played Seconds: {playedSeconds}</div>
      <div>Duration: {duration}</div>
      <div>Continuous Watch Time: {watchTime}</div>
    </div>
  );
};

export default VideoPlayer;

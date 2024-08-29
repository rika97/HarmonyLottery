import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, onVideoEnd, threshold = 0.9 }) => {
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleProgress = (progress) => {
    setPlayedSeconds(progress.playedSeconds);
    setDuration(progress.loadedDuration || duration);

    if (playedSeconds / duration >= threshold) {
      onVideoEnd();
    }
  };

  return (
    <div className="video-player">
      <ReactPlayer
        url={videoUrl}
        controls
        playing
        onProgress={handleProgress}
        onEnded={onVideoEnd}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;

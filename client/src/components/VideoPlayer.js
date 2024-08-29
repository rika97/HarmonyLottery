import React, { useRef, useState } from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId, onWatched, threshold = 0.9 }) => {
  const playerRef = useRef(null);
  const [watchedDuration, setWatchedDuration] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const onReady = (event) => {
    playerRef.current = event.target;
    setVideoDuration(playerRef.current.getDuration());
  };

  const onStateChange = (event) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      const intervalId = setInterval(() => {
        if (playerRef.current) {
          setWatchedDuration(playerRef.current.getCurrentTime());
        }
      }, 1000);

      playerRef.current.intervalId = intervalId;
    } else if (
      event.data === YouTube.PlayerState.PAUSED ||
      event.data === YouTube.PlayerState.ENDED
    ) {
      clearInterval(playerRef.current.intervalId);
    }

    if (event.data === YouTube.PlayerState.ENDED) {
      const watchedPercentage = watchedDuration / videoDuration;

      if (watchedPercentage >= threshold) {
        onWatched();
      } else {
        alert(
          `You need to watch at least ${
            threshold * 100
          }% of the video to earn points.`
        );
      }
    }
  };

  return (
    <YouTube
      videoId={videoId}
      onReady={onReady}
      onStateChange={onStateChange}
      opts={{
        playerVars: {
          autoplay: 1,
          controls: 1,
        },
      }}
    />
  );
};

export default VideoPlayer;

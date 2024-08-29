/* eslint-disable */

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, onThresholdReached, onClose, threshold = 0.9 }) => {
  const [playedSeconds, setPlayedSeconds] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [watchTime, setWatchTime] = React.useState(0);
  const [lastTime, setLastTime] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    setDuration(0);
    setPlayedSeconds(0);
    setWatchTime(0);
    setLastTime(0);
    setIsPlaying(false);
  }, [videoUrl]);

  const handleProgress = (progress) => {
    const { playedSeconds, loadedDuration } = progress;

    setPlayedSeconds(playedSeconds);
    setDuration(loadedDuration || duration);

    if (isPlaying) {
      const timeIncrement = playedSeconds - lastTime;
      const maxAllowedIncrement = 3; // disable skip/fastfowarding
      if (timeIncrement > 0 && timeIncrement <= maxAllowedIncrement) {
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

  const handleEnded = () => {
    if (watchTime / duration < threshold) {
      console.log('Video ended before reaching the threshold.');
    }
    onClose();
  };

  return (
    <Dialog
      open={!!videoUrl}
      onClose={onClose}
      fullScreen
      PaperProps={{
        style: {
          height: '100vh',
          width: '100vw',
        },
      }}
    >
      <DialogContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          position: 'relative',
          padding: 0,
        }}
      >
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
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 20, right: 20, color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <p>Played Seconds: {playedSeconds.toFixed(2)}</p>
          <p>Duration: {duration.toFixed(2)}</p>
          <p>Watch Time: {watchTime.toFixed(2)}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;

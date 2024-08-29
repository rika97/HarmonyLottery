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
  const [isThresholdReached, setIsThresholdReached] = React.useState(false);

  React.useEffect(() => {
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
    <Dialog
      open={!!videoUrl}
      onClose={onClose}
      fullScreen
      sx={{ '.MuiDialogContent-root': { padding: 0 } }} 
    >
      <DialogContent
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
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
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;

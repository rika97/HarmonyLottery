import React, { useState, useEffect } from 'react';
import { Container, Paper, Box, Typography } from '@mui/material';
import VideoList from '../components/VideoList';
import VideoPlayer from '../components/VideoPlayer';

const Tasks = () => {
  const [watchedVideos, setWatchedVideos] = useState(new Set());
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
      fetchWatchedVideos(userId);
    } else {
      console.error('Telegram WebApp is not available.');
    }
  }, []);

  const fetchWatchedVideos = async (userId) => {
    try {
      const response = await fetch(`https://hod1-a52bc53a961e.herokuapp.com/watchedVideos?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWatchedVideos(new Set(data.videos || []));
    } catch (error) {
      console.error('Error fetching watched videos:', error);
    }
  };

  const watchVideo = (videoId, videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setCurrentVideoId(videoId);
  };

  const handleThresholdReached = async () => {
    try {
      if (window.Telegram && window.Telegram.WebApp) {
        const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
        const response = await fetch(`https://hod1-a52bc53a961e.herokuapp.com/watch?userId=${userId}&videoId=${currentVideoId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // const data = await response.json();

        setWatchedVideos((prev) => {
          const newWatchedVideos = new Set(prev);
          newWatchedVideos.add(currentVideoId);

          fetch('https://hod1-a52bc53a961e.herokuapp.com/updateWatchedVideos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, videoId: currentVideoId }),
          })
            .then((res) => res.json())
            .then((result) => console.log(result.message))
            .catch((error) => console.error('Error updating watched videos:', error));

          return newWatchedVideos;
        });
      }
    } catch (error) {
      console.error('Error completing video:', error);
    }
  };

  const closeVideoPlayer = () => {
    setCurrentVideoUrl(null);
    setCurrentVideoId(null);
  };

  const isVideoWatched = (videoId) => watchedVideos.has(videoId);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Leaderboard</Typography>
      <Box textAlign="center" my={4}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <VideoList watchVideo={watchVideo} isVideoWatched={isVideoWatched} />
        </Paper>
        {currentVideoUrl && (
          <VideoPlayer
            videoUrl={currentVideoUrl}
            onThresholdReached={handleThresholdReached}
            onClose={closeVideoPlayer}
          />
        )}
      </Box>
    </Container>
  );
};

export default Tasks;

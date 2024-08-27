import React, { useState, useEffect } from 'react';
import VideoList from './components/VideoList';
import PointsBalance from './components/PointsBalance';

function App() {
  const [points, setPoints] = useState(0);
  const [watchedVideos, setWatchedVideos] = useState(new Set());

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const { WebApp } = window.Telegram;

      document.body.style.backgroundColor = WebApp.themeParams.backgroundColor || '#ffffff';

      const userId = WebApp.initDataUnsafe.user.id;

      fetchPoints(userId);
      fetchWatchedVideos(userId);
    } else {
      console.error('Telegram WebApp is not available.');
    }
  }, []);

  const fetchPoints = async (userId) => {
    try {
      const response = await fetch(`https://hod1-a52bc53a961e.herokuapp.com/points?userId=${userId}`);
      const data = await response.json();
      setPoints(data.points);
    } catch (error) {
      console.error('Error fetching points:', error);
    }
  };

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

  const watchVideo = async (videoId) => {
    try {
      if (window.Telegram && window.Telegram.WebApp) {
        const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
        const response = await fetch(`https://hod1-a52bc53a961e.herokuapp.com/watch?userId=${userId}&videoId=${videoId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setPoints(data.points);
        setWatchedVideos(prev => {
          const newWatchedVideos = new Set(prev);
          newWatchedVideos.add(videoId);

          fetch('https://hod1-a52bc53a961e.herokuapp.com/updateWatchedVideos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, videoId }),
          }).then(res => res.json())
            .then(result => console.log(result.message))
            .catch(error => console.error('Error updating watched videos:', error));
            
          return newWatchedVideos;
        });
      } else {
        console.error('Telegram WebApp is not available.');
      }
    } catch (error) {
      console.error('Error watching video:', error);
    }
  };

  const isVideoWatched = (videoId) => watchedVideos.has(videoId);

  return (
    <div>
      <h1>Hod1</h1>
      <PointsBalance points={points} />
      <VideoList watchVideo={watchVideo} isVideoWatched={isVideoWatched}/>
    </div>
  );
}

export default App;

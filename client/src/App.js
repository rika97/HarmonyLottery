import React, { useState, useEffect } from 'react';
import VideoList from './components/VideoList';
import PointsBalance from './components/PointsBalance';

function App() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        if (window.Telegram && window.Telegram.WebApp) {
          const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
          const response = await fetch(`/points?userId=${userId}`);
          const data = await response.json();
          setPoints(data.points);
        } else {
          console.error('Telegram WebApp is not available.');
        }
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    };

    fetchPoints();
  }, []);

  const watchVideo = async (videoId) => {
    try {
      if (window.Telegram && window.Telegram.WebApp) {
        const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
        const response = await fetch(`/watch?userId=${userId}&videoId=${videoId}`);
        const data = await response.json();
        setPoints(data.points);
      } else {
        console.error('Telegram WebApp is not available.');
      }
    } catch (error) {
      console.error('Error watching video:', error);
    }
  };

  return (
    <div>
      <h1>Hod1</h1>
      <PointsBalance points={points} />
      <VideoList watchVideo={watchVideo} />
    </div>
  );
}

export default App;

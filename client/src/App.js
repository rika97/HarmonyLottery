import React, { useState, useEffect } from 'react';
import VideoList from './components/VideoList';
import PointsBalance from './components/PointsBalance';

function App() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const { WebApp } = window.Telegram;

      document.body.style.backgroundColor = WebApp.themeParams.backgroundColor || '#ffffff';

      const fetchPoints = async () => {
        try {
          const userId = WebApp.initDataUnsafe.user.id;
          const response = await fetch(`https://hod1-a52bc53a961e.herokuapp.com/points?userId=${userId}`);
          const data = await response.json();
          setPoints(data.points);
        } catch (error) {
          console.error('Error fetching points:', error);
        }
      };

      fetchPoints();
    } else {
      console.error('Telegram WebApp is not available.');
    }
  }, []);

  const watchVideo = async (videoId) => {
    try {
      if (window.Telegram && window.Telegram.WebApp) {
        const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
        const response = await fetch(`https://hod1-a52bc53a961e.herokuapp.com/watch?userId=${userId}&videoId=${videoId}`);
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

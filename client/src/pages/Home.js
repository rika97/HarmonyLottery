import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const Home = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const initializeUser = async (userId) => {
      try {
        const pointsResponse = await fetch(`https://hod1-a52bc53a961e.herokuapp.com/points?userId=${userId}`);
        const pointsData = await pointsResponse.json();

        if (pointsData.points === undefined) {
          await fetch('https://hod1-a52bc53a961e.herokuapp.com/initializeUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
          });
          setPoints(0);
        } else {
          setPoints(pointsData.points);
        }
      } catch (error) {
        console.error('Error initializing user:', error);
      }
    };

    if (window.Telegram && window.Telegram.WebApp) {
      const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
      initializeUser(userId);
    } else {
      console.error('Telegram WebApp is not available.');
    }
  }, []);

  return <Typography variant="h6">Points: {points} NIL</Typography>;
};

export default Home;

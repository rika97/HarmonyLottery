import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const Home = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const initializeUser = async (userId) => {
      try {
        const response = await fetch(`https://hod1-a52bc53a961e.herokuapp.com/points?userId=${userId}`);
        const data = await response.json();

        if (data.points === undefined) {
          await fetch(`https://hod1-a52bc53a961e.herokuapp.com/initializeUser?userId=${userId}`, { method: 'POST' });
          setPoints(0);
        } else {
          setPoints(data.points);
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

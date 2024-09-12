import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const Home = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const initializeUser = async (userId) => {
      try {
        console.log(`Initializing user with ID: ${userId}`);
        const response = await fetch(`https://hod1-a52bc53a961e.herokuapp.com/points?userId=${userId}`);
        const data = await response.json();
        console.log('Fetched points:', data);

        if (data.points === undefined) {
          console.log('Points undefined, initializing user.');
          await fetch(`https://hod1-a52bc53a961e.herokuapp.com/initializeUser?userId=${userId}`, { method: 'POST' });
          fetchPoints(userId);
        } else {
          setPoints(data.points);
        }
      } catch (error) {
        console.error('Error initializing user:', error);
      }
    };

    const fetchPoints = async (userId) => {
      try {
        const response = await fetch(`https://hod1-a52bc53a961e.herokuapp.com/points?userId=${userId}`);
        const data = await response.json();
        console.log('Fetched points after initialization:', data);
        setPoints(data.points);
      } catch (error) {
        console.error('Error fetching points:', error);
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

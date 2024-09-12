import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const Home = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
      fetchPoints(userId);
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

  return <Typography variant="h6">Points: {points} NIL</Typography>;
};

export default Home;

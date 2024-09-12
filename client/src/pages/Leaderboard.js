import React, { useEffect } from 'react';
import { Typography } from '@mui/material';

const Leaderboard = () => {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
      fetchPoints(userId);
    } else {
      console.error('Telegram WebApp is not available.');
    }
  }, []);

  return <Typography variant="h6">Leaderboard</Typography>;
};

export default Leaderboard;

import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [telegramAvailable, setTelegramAvailable] = useState(false);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      setTelegramAvailable(true);
      const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
      setCurrentUser(userId);
    } else {
      console.error('Telegram WebApp is not available.');
    }
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('https://hod1-a52bc53a961e.herokuapp.com/leaderboard');
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };
    
    if (telegramAvailable) {
      fetchLeaderboard();
    }
  }, [telegramAvailable]);

  const isCurrentUser = (userId) => currentUser === userId;

  return (
    <div>
      <Typography variant="h4">Leaderboard</Typography>
      {telegramAvailable ? (
        <List>
          {leaderboard.slice(0, 30).map((user, index) => (
            <ListItem
              key={user.userId}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: isCurrentUser(user.userId) ? '#e0f7fa' : 'inherit',
                borderRadius: '4px',
                padding: '8px',
              }}
            >
              <ListItemAvatar>
                <Avatar style={{ width: 24, height: 24, fontSize: '14px' }}>
                  {index + 1}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Points: ${user.points}`}
                secondary={`User ID: ${user.userId}`}
                primaryTypographyProps={{ style: { fontSize: '16px', color: 'black' } }}
                secondaryTypographyProps={{ style: { fontSize: '12px' } }}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" color="error">
          Telegram WebApp is not available. Please open this in the Telegram app.
        </Typography>
      )}
    </div>
  );
};

export default Leaderboard;

import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserRank, setCurrentUserRank] = useState(null);
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

        const rank = data.findIndex(user => user.userId === currentUser);
        setCurrentUserRank(rank >= 0 ? rank + 1 : null);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    if (telegramAvailable) {
      fetchLeaderboard();
    }
  }, [telegramAvailable, currentUser]);

  const isCurrentUser = (userId) => currentUser === userId;

  return (
    <div>
      <Typography variant="h4">Leaderboard</Typography>
      {telegramAvailable ? (
        <div>
          {currentUserRank !== null && (
            <Typography variant="h6">
              {`Current User Ranking: #${currentUserRank}`}
            </Typography>
          )}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ranking</TableCell>
                  <TableCell align="center">Points</TableCell>
                  <TableCell align="right">User ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.slice(0, 30).map((user, index) => (
                  <TableRow
                    key={user.userId}
                    style={{
                      backgroundColor: isCurrentUser(user.userId) ? '#e0f7fa' : 'inherit',
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="center" style={{ color: 'black' }}>{user.points}</TableCell>
                    <TableCell align="right" style={{ fontSize: '12px' }}>{user.userId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <Typography variant="body1" color="error">
          Telegram WebApp is not available. Please open this in the Telegram app.
        </Typography>
      )}
    </div>
  );
};

export default Leaderboard;

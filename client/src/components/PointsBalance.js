import React from 'react';
import { Paper, Typography } from '@mui/material';

const PointsBalance = ({ points }) => {
  return (
    <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6">Points Balance: {points}</Typography>
    </Paper>
  );
};

export default PointsBalance;
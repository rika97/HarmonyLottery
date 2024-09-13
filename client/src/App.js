import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Typography, Box, AppBar, Toolbar, Button, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/List';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/tasks">Tasks</Button>
          <Button color="inherit" component={Link} to="/leaderboard">Leaderboard</Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="sm">
        <Box textAlign="center" my={4}>
          <Typography variant="h3" gutterBottom>
            Hod1
          </Typography>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </Box>
      </Container>

      <BottomNavigation
        showLabels
        style={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} to="/" />
        <BottomNavigationAction label="Tasks" icon={<TaskIcon />} component={Link} to="/tasks" />
        <BottomNavigationAction label="Leaderboard" icon={<LeaderboardIcon />} component={Link} to="/leaderboard" />
      </BottomNavigation>
    </Router>
  );
}

export default App;

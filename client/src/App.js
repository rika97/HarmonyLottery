import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Container, Typography, Box, AppBar, Toolbar, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/List';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Leaderboard from './pages/Leaderboard';

const App = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setValue(0);
        break;
      case '/tasks':
        setValue(1);
        break;
      case '/leaderboard':
        setValue(2);
        break;
      default:
        setValue(0);
        break;
    }
  }, [location]);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hod1
          </Typography>
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
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
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
};

export default App;

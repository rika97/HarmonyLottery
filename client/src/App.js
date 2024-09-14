import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CssBaseline, Container, Typography, Box, AppBar, Toolbar, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/List';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Leaderboard from './pages/Leaderboard';
// import GoogleAuthCallback from './components/oAuth/YouTube/GoogleAuthCallback';

const MainContent = () => {
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
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hod1
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
        <Box textAlign="center" my={4}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            {/* <Route path="/auth/google/callback" element={<GoogleAuthCallback />} /> */}
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
    </>
  );
};

const App = () => {
  return (
    <>
      <CssBaseline /> 
      <Router>
        <MainContent />
      </Router>
    </>
  );
};

export default App;

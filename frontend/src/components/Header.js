// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function Header() {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: 'linear-gradient(45deg, #4527A0 30%, #7953D2 90%)',
            px: 2,
            py: 1,
            borderRadius: 2,
            boxShadow: '0 3px 5px 2px rgba(105, 58, 183, .3)'
          }}>
            <CalendarMonthIcon sx={{ mr: 1, color: '#FFD700' }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ 
                fontWeight: 'bold',
                color: '#FFD700'  // Changed to solid gold color
              }}
            >
              Laurier Exam Scheduler
            </Typography>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'secondary.light',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Winter 2025
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
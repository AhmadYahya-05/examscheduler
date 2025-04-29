// src/theme.js
import { createTheme } from '@mui/material/styles';

// Laurier colors
const laurierPurple = '#5E2D91';  // Primary purple
const laurierGold = '#FFB81C';    // Primary gold
const lightPurple = '#8F6BB2';
const darkPurple = '#4A2272';

const theme = createTheme({
  palette: {
    primary: {
      main: laurierPurple,
      light: lightPurple,
      dark: darkPurple,
      contrastText: '#ffffff',
    },
    secondary: {
      main: laurierGold,
      light: '#FFCF5E',
      dark: '#E6A500',
      contrastText: darkPurple,
    },
    background: {
      default: '#f8f8fb',
    },
  },
  typography: {
    fontFamily: [
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundImage: `linear-gradient(45deg, ${laurierPurple} 30%, ${lightPurple} 90%)`,
          boxShadow: `0 3px 5px 2px ${laurierPurple}40`,
          '&:hover': {
            backgroundImage: `linear-gradient(45deg, ${darkPurple} 30%, ${laurierPurple} 90%)`,
          },
        },
        containedSecondary: {
          backgroundImage: `linear-gradient(45deg, ${laurierGold} 30%, #FFCF5E 90%)`,
          color: darkPurple,
          boxShadow: `0 3px 5px 2px ${laurierGold}40`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          '&.Mui-selected': {
            fontWeight: 700,
          },
        },
      },
    },
  },
});

export default theme;
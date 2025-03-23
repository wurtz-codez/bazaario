import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5271ff',
      light: '#7990ff',
      dark: '#3254e8',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff5786',
      light: '#ff7fa3',
      dark: '#e0316a',
      contrastText: '#fff',
    },
    background: {
      default: '#f8f9fd',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#5a6a7e',
    },
    success: {
      main: '#34d399',
      light: '#6ee7b7',
      dark: '#10b981',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      letterSpacing: '0em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: '0.00735em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      letterSpacing: '0em',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      letterSpacing: '0.0075em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02857em',
    },
    body1: {
      fontSize: '1rem',
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      letterSpacing: '0.01071em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#c1c1c1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#a8a8a8',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 20px',
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            transform: 'translateY(-2px)',
          },
        },
        containedPrimary: {
          backgroundImage: 'linear-gradient(90deg, #5271ff, #758bff)',
          '&:hover': {
            backgroundImage: 'linear-gradient(90deg, #3254e8, #5271ff)',
          },
        },
        containedSecondary: {
          backgroundImage: 'linear-gradient(90deg, #ff5786, #ff7fa3)',
          '&:hover': {
            backgroundImage: 'linear-gradient(90deg, #e0316a, #ff5786)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 24px rgba(149, 157, 165, 0.1)',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 12px 32px rgba(149, 157, 165, 0.15)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 24px rgba(149, 157, 165, 0.1)',
        },
        elevation1: {
          boxShadow: '0 4px 12px rgba(149, 157, 165, 0.08)',
        },
        elevation2: {
          boxShadow: '0 6px 16px rgba(149, 157, 165, 0.1)',
        },
        elevation3: {
          boxShadow: '0 8px 20px rgba(149, 157, 165, 0.12)',
        },
        elevation4: {
          boxShadow: '0 10px 24px rgba(149, 157, 165, 0.14)',
        },
        elevation5: {
          boxShadow: '0 12px 28px rgba(149, 157, 165, 0.16)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          marginTop: 2,
          marginBottom: 2,
          marginLeft: 8,
          marginRight: 8,
          transition: 'all 0.2s ease',
          '&.Mui-selected': {
            backgroundColor: 'rgba(82, 113, 255, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(82, 113, 255, 0.12)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            transform: 'translateX(4px)',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
          color: 'inherit',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
          boxShadow: '4px 0 24px rgba(149, 157, 165, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(149, 157, 165, 0.1)',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          color: '#2c3e50',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            transition: 'all 0.2s ease',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#5271ff',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 4px rgba(82, 113, 255, 0.12)',
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.9rem',
          minWidth: 100,
          '&.Mui-selected': {
            color: '#5271ff',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          '&.MuiChip-colorPrimary': {
            backgroundColor: 'rgba(82, 113, 255, 0.08)',
            color: '#5271ff',
          },
          '&.MuiChip-colorSecondary': {
            backgroundColor: 'rgba(255, 87, 134, 0.08)',
            color: '#ff5786',
          },
          '&.MuiChip-colorSuccess': {
            backgroundColor: 'rgba(52, 211, 153, 0.08)',
            color: '#10b981',
          },
          '&.MuiChip-colorError': {
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            color: '#ef4444',
          },
          '&.MuiChip-colorWarning': {
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            color: '#f59e0b',
          },
          '&.MuiChip-colorInfo': {
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            color: '#3b82f6',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 46,
          height: 26,
          padding: 0,
          '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
              transform: 'translateX(20px)',
              '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#5271ff',
              },
            },
          },
          '& .MuiSwitch-thumb': {
            width: 22,
            height: 22,
          },
          '& .MuiSwitch-track': {
            borderRadius: 13,
            opacity: 1,
            backgroundColor: '#dee2e6',
          },
        },
      },
    },
  },
});

export default theme;

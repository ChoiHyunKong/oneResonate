import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#9CAF88', // Warm Sage
      light: '#B8C5A3',
      dark: '#7A8A6B',
    },
    secondary: {
      main: '#D4A5A5', // Dusty Rose
      light: '#E2C0C0',
      dark: '#B88A8A',
    },
    background: {
      default: '#F7F3E9', // Soft Cream
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E3A', // Deep Forest
      secondary: '#5A6C65',
    },
  },
  typography: {
    fontFamily: [
      'Pretendard',
      'Noto Sans KR',
      '-apple-system',
      'BlinkMacSystemFont',
      'system-ui',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 300,
      lineHeight: 1.6,
      letterSpacing: '0.5px',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 300,
      lineHeight: 1.6,
      letterSpacing: '0.4px',
    },
    body1: {
      fontSize: '1.1rem',
      fontWeight: 400,
      lineHeight: 1.8,
      letterSpacing: '0.3px',
    },
    button: {
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: '0.2px',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          padding: '12px 32px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(156, 175, 136, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(8px)',
        },
      },
    },
  },
})

// 반응형 디자인을 위한 추가 스타일
theme.components = {
  ...theme.components,
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
        },
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      h1: {
        [theme.breakpoints.down('sm')]: {
          fontSize: '2rem',
        },
      },
      h2: {
        [theme.breakpoints.down('sm')]: {
          fontSize: '1.6rem',
        },
      },
      h3: {
        [theme.breakpoints.down('sm')]: {
          fontSize: '1.4rem',
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(1),
          fontSize: '0.8rem',
        },
      },
    },
  },
}

export default theme
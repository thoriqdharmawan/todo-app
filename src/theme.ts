import { Palette, createTheme } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

declare module '@mui/material/styles' {
  interface Theme {
    bs: string[];
  }
  interface ThemeOptions {
    bs?: string[];
    breakpoints: {
      values: {
        xs: number
        sm: number
        md: number
        lg: number
        xl: number
      }
    };
    typography?: TypographyOptions | ((palette: Palette) => TypographyOptions) | undefined;
  }
}

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          borderRadius: '45px',
          padding: '13.5px 29px',
          fontSize: 18,
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '12px',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#16ABF8',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F4F4F4',
      contrastText: '#4A4A4A',
    },
    error: {
      main: '#ED4C5C',
      contrastText: '#fff',
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    },
    fontFamily: [
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  bs: [
    'none',
    '0px 4px 10px rgba(0, 0, 0, 0.1)',
    '0px 6px 10px rgba(0, 0, 0, 0.1)'
  ]
});

import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#ff1744',
    },
    background: {
        default: '#ff00ff', // Set your desired background color here
    },
  },
});

export default theme;
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3498db', // Example primary color
        },
        secondary: {
            main: '#2ecc71', // Example secondary color
        },
        background: {
            default: '#f0f0f0',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        h1: {
            fontWeight: 500,
            fontSize: '2.5rem',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '5px',
                    textTransform: 'none',
                },
            },
        },
    },
});

export default theme;
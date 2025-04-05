import React, { useState } from 'react';
import Button from '@mui/material/Button';


const ThemeSwitcher = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
        document.body.classList.toggle('dark-theme', !isDarkTheme);
    };

    return (
        <Button variant="contained" onClick={toggleTheme}>
            Switch to {isDarkTheme ? 'Light' : 'Dark'} Theme
        </Button>
    );
};

export default ThemeSwitcher;
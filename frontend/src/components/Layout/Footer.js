import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', p: 2 }}>
            <Typography variant="body2" align="center">
                &copy; {new Date().getFullYear()} LLM NAAC Report Assessor. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
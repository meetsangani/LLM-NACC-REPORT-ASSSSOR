import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const NotFoundPage = () => {
    return (
        <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                404 - Not Found
            </Typography>
            <Typography variant="body1">
                The page you are looking for does not exist.
            </Typography>
        </Container>
    );
};

export default NotFoundPage;
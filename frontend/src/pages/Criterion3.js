import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Criterion3 = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Criterion 3: Research, Innovations & Extension
        </Typography>
        <Typography variant="body1" paragraph>
          This criterion assesses the institution's research output, innovation practices, and extension activities. It emphasizes the promotion of research culture and societal engagement.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Discover ways to foster research and innovation in your institution.
        </Typography>
      </Box>
    </Container>
  );
};

export default Criterion3;
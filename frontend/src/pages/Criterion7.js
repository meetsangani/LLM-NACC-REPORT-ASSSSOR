import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Criterion7 = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Criterion 7: Institutional Values & Best Practices
        </Typography>
        <Typography variant="body1" paragraph>
          This criterion evaluates the institution's commitment to ethical values, environmental sustainability, and best practices. It also assesses the promotion of inclusivity and social responsibility.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Discover how to implement best practices and uphold institutional values.
        </Typography>
      </Box>
    </Container>
  );
};

export default Criterion7;
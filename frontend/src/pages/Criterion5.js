import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Criterion5 = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Criterion 5: Student Support & Progression
        </Typography>
        <Typography variant="body1" paragraph>
          This criterion focuses on the support provided to students for their academic and personal growth. It also evaluates the progression of students to higher education or employment.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Explore strategies to enhance student support and progression.
        </Typography>
      </Box>
    </Container>
  );
};

export default Criterion5;
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Criterion2 = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Criterion 2: Teaching-Learning & Evaluation
        </Typography>
        <Typography variant="body1" paragraph>
          This criterion evaluates the teaching-learning process, student-centric methods, and the effectiveness of evaluation systems. It focuses on the quality of teaching and learning outcomes.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Learn how to enhance teaching-learning practices and evaluation mechanisms.
        </Typography>
      </Box>
    </Container>
  );
};

export default Criterion2;
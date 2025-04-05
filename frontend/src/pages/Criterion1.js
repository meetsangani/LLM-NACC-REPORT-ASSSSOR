import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Criterion1 = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Criterion 1: Curricular Aspects
        </Typography>
        <Typography variant="body1" paragraph>
          This criterion focuses on the design and implementation of the curriculum, ensuring alignment with institutional goals and NAAC standards. It evaluates the relevance and flexibility of the curriculum to meet the needs of stakeholders.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Explore how your institution's curricular aspects align with NAAC's expectations.
        </Typography>
      </Box>
    </Container>
  );
};

export default Criterion1;
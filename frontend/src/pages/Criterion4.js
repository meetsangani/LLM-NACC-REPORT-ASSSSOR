import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Criterion4 = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Criterion 4: Infrastructure & Learning Resources
        </Typography>
        <Typography variant="body1" paragraph>
          This criterion evaluates the adequacy and optimal use of physical, academic, and support facilities. It also assesses the availability of learning resources like libraries and IT infrastructure.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ensure your institution's infrastructure meets NAAC standards.
        </Typography>
      </Box>
    </Container>
  );
};

export default Criterion4;
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Criterion6 = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Criterion 6: Governance, Leadership & Management
        </Typography>
        <Typography variant="body1" paragraph>
          This criterion assesses the institution's governance structure, leadership practices, and management systems. It emphasizes transparency, accountability, and strategic planning.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Learn how to strengthen governance and leadership in your institution.
        </Typography>
      </Box>
    </Container>
  );
};

export default Criterion6;
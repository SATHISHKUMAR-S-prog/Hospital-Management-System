import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingPage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <CircularProgress size={60} thickness={4} color="primary" />
      <Typography variant="h6" mt={3} color="textSecondary">
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default LoadingPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Box, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" component="h1" sx={{ mb: 2, fontSize: { xs: '4rem', md: '6rem' } }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button variant="contained" component={Link} to="/" startIcon={<HomeIcon />}>
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;

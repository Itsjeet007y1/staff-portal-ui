import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export const SettingsView: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="body1">
          Application settings will be displayed here.
        </Typography>
      </Paper>
    </Box>
  );
};

import React from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services';

interface HorizontalMenuProps {
  onMenuClick: () => void;
}

export const HorizontalMenu: React.FC<HorizontalMenuProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: { xs: 1, sm: 2 } }}
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 0, 
            mr: { xs: 1, sm: 2, md: 4 },
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}
        >
          Staff Portal
        </Typography>
        <Box sx={{ 
          flexGrow: 1, 
          display: { xs: 'none', md: 'flex' }, 
          gap: 2 
        }}>
          <Button color="inherit" onClick={() => navigate('/')}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={() => navigate('/employees/grid')}>
            Employees
          </Button>
          <Button color="inherit" onClick={() => navigate('/reports')}>
            Reports
          </Button>
          <Button color="inherit" onClick={() => navigate('/settings')}>
            Settings
          </Button>
        </Box>
        <Box sx={{ flexGrow: { xs: 1, md: 0 } }} />
        <IconButton color="inherit" onClick={handleLogout}>
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

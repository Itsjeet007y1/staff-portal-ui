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
          sx={{ mr: 2 }}
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
          Staff Portal
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
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
        <IconButton color="inherit" onClick={handleLogout}>
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Box,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  Settings,
  ExpandLess,
  ExpandMore,
  GridView,
  ViewModule,
  Analytics,
  Report,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { text: string; icon: React.ReactNode; path: string }[];
}

const menuItems: MenuItem[] = [
  {
    text: 'Dashboard',
    icon: <Dashboard />,
    path: '/',
  },
  {
    text: 'Employees',
    icon: <People />,
    subItems: [
      { text: 'Grid View', icon: <GridView />, path: '/employees/grid' },
      { text: 'Tile View', icon: <ViewModule />, path: '/employees/tile' },
    ],
  },
  {
    text: 'Reports',
    icon: <Report />,
    subItems: [
      { text: 'Analytics', icon: <Analytics />, path: '/reports/analytics' },
    ],
  },
  {
    text: 'Settings',
    icon: <Settings />,
    path: '/settings',
  },
];

interface HamburgerMenuProps {
  open: boolean;
  onClose: () => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});

  const handleSubMenuToggle = (text: string) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [text]: !prev[text],
    }));
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 280 }} role="presentation">
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <IconButton onClick={onClose}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (item.subItems) {
                      handleSubMenuToggle(item.text);
                    } else if (item.path) {
                      handleNavigation(item.path);
                    }
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {item.subItems &&
                    (openSubMenus[item.text] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>
              {item.subItems && (
                <Collapse in={openSubMenus[item.text]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItemButton
                        key={subItem.text}
                        sx={{ pl: 4 }}
                        onClick={() => handleNavigation(subItem.path)}
                      >
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

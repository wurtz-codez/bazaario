import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WebIcon from '@mui/icons-material/Web';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
    },
    {
      text: 'Websites',
      icon: <WebIcon />,
      path: '/websites',
    },
    {
      text: 'Orders',
      icon: <ShoppingCartIcon />,
      path: '/orders',
    },
    {
      text: 'Analytics',
      icon: <BarChartIcon />,
      path: '/analytics',
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings',
    },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: '64px', // AppBar height
          height: 'calc(100% - 64px)',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(63, 81, 181, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(63, 81, 181, 0.2)',
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar; 
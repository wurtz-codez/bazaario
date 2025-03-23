import React, { useState, useContext } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WebIcon from '@mui/icons-material/Web';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BoltIcon from '@mui/icons-material/Bolt';

import AuthContext from '../context/AuthContext';

const drawerWidth = 260;

const logoVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
  }
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (custom) => ({
    opacity: 1,
    x: 0,
    transition: { 
      delay: custom * 0.1,
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  })
};

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  
  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    logout();
    navigate('/login');
  };
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path === '/websites') return 'My Websites';
    if (path === '/orders') return 'Orders';
    if (path === '/analytics') return 'Analytics';
    if (path === '/templates') return 'Create Website';
    if (path.startsWith('/websites/') && path.endsWith('/edit')) return 'Edit Website';
    if (path.startsWith('/websites/')) return 'Website Details';
    if (path.startsWith('/orders/')) return 'Order Details';
    return '';
  };
  
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'My Websites', icon: <WebIcon />, path: '/websites' },
    { text: 'Orders', icon: <ShoppingCartIcon />, path: '/orders' },
    { text: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
  ];
  
  const secondaryMenuItems = [
    { text: 'Create Website', icon: <AddIcon />, path: '/templates' },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={logoVariants}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BoltIcon sx={{ color: 'primary.main', fontSize: 28 }} />
            <Typography variant="h5" fontWeight="bold" color="primary.main">
              Bazaario
            </Typography>
          </Box>
        </motion.div>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.text}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={listItemVariants}
          >
            <ListItem disablePadding>
              <ListItemButton 
                component={Link} 
                to={item.path}
                selected={location.pathname === item.path}
                onClick={isMobile ? handleDrawerToggle : undefined}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>
      <Divider />
      <List>
        {secondaryMenuItems.map((item, index) => (
          <motion.div
            key={item.text}
            custom={menuItems.length + index}
            initial="hidden"
            animate="visible"
            variants={listItemVariants}
          >
            <ListItem disablePadding>
              <ListItemButton 
                component={Link} 
                to={item.path}
                selected={location.pathname === item.path}
                onClick={isMobile ? handleDrawerToggle : undefined}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="600" noWrap component="div" sx={{ flexGrow: 1 }}>
            {getPageTitle()}
          </Typography>
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" onClick={handleNotificationClick} sx={{ mr: 1 }}>
                <Badge badgeContent={3} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Menu
                anchorEl={notificationAnchorEl}
                open={Boolean(notificationAnchorEl)}
                onClose={handleNotificationClose}
                PaperProps={{
                  elevation: 3,
                  sx: { 
                    width: 320,
                    maxHeight: 400,
                    overflow: 'auto',
                    borderRadius: 2,
                    p: 1,
                  },
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <Typography variant="subtitle1" fontWeight="600" sx={{ p: 1 }}>
                  Notifications
                </Typography>
                <Divider />
                <MenuItem onClick={handleNotificationClose}>
                  <Typography variant="body2" fontWeight="500" color="primary">
                    New order received
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleNotificationClose}>
                  <Typography variant="body2" fontWeight="500" color="primary">
                    Website traffic increased by 25%
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleNotificationClose}>
                  <Typography variant="body2" fontWeight="500" color="primary">
                    2 new form submissions
                  </Typography>
                </MenuItem>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
                  <Button size="small">View all</Button>
                </Box>
              </Menu>
              
              <Button
                onClick={handleUserMenuClick}
                startIcon={
                  <Avatar
                    sx={{ 
                      width: 34, 
                      height: 34, 
                      bgcolor: 'primary.main',
                      boxShadow: '0 0 0 2px white',
                    }}
                  >
                    {user.name ? user.name.charAt(0) : 'U'}
                  </Avatar>
                }
                color="inherit"
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                }}
              >
                {!isMobile && user.name}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
                PaperProps={{
                  elevation: 3,
                  sx: { minWidth: 180, borderRadius: 2 },
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem component={Link} to="/profile" onClick={handleUserMenuClose}>
                  <ListItemIcon>
                    <PersonIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">Profile</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon color="error" fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit" color="error.main">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar /> {/* Spacer to push content below app bar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet /> {/* This is the key part - it renders the matched route */}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default Layout;
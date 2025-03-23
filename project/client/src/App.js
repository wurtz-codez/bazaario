import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import theme from './theme';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import TemplateSelection from './pages/TemplateSelection';
import WebsiteBuilder from './pages/WebsiteBuilder';
import WebsiteDetails from './pages/WebsiteDetails';
import WebsiteEdit from './pages/WebsiteEdit';
import WebsitesList from './pages/WebsitesList';
import OrdersList from './pages/OrdersList';
import OrderDetails from './pages/OrderDetails';
import Analytics from './pages/Analytics';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  // Remove preloader once app has loaded
  useEffect(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 1000);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box sx={{ 
            bgcolor: 'background.default', 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Private Routes - wrapped with Layout */}
              <Route element={<Layout />}>
                <Route path="/" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                <Route path="/templates" element={
                  <PrivateRoute>
                    <TemplateSelection />
                  </PrivateRoute>
                } />
                <Route path="/website-builder/new/:templateId" element={
                  <PrivateRoute>
                    <WebsiteBuilder />
                  </PrivateRoute>
                } />
                <Route path="/websites" element={
                  <PrivateRoute>
                    <WebsitesList />
                  </PrivateRoute>
                } />
                <Route path="/websites/:id" element={
                  <PrivateRoute>
                    <WebsiteDetails />
                  </PrivateRoute>
                } />
                <Route path="/websites/:id/edit" element={
                  <PrivateRoute>
                    <WebsiteEdit />
                  </PrivateRoute>
                } />
                <Route path="/orders" element={
                  <PrivateRoute>
                    <OrdersList />
                  </PrivateRoute>
                } />
                <Route path="/orders/:id" element={
                  <PrivateRoute>
                    <OrderDetails />
                  </PrivateRoute>
                } />
                <Route path="/analytics" element={
                  <PrivateRoute>
                    <Analytics />
                  </PrivateRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

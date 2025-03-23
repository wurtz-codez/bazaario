import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  CircularProgress,
  Chip,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WebIcon from '@mui/icons-material/Web';
import AddIcon from '@mui/icons-material/Add';
import AuthContext from '../context/AuthContext';
import { authAPI } from '../utils/api';
import { getPreviewUrl } from '../utils/domainPreview';

// Mock data for development
const mockWebsites = [
  {
    _id: '1',
    name: 'Pizza Palace',
    domain: 'pizzapalace.bazaario.com',
    description: 'A beautiful website for a local pizza restaurant with online ordering capabilities.',
    template: { 
      _id: '101', 
      name: 'Restaurant Template', 
      category: 'restaurant',
      thumbnail: 'https://via.placeholder.com/300'
    },
  },
  {
    _id: '2',
    name: 'Urban Fashion',
    domain: 'urbanfashion.bazaario.com',
    description: 'Modern clothing store with catalog and shopping cart functionality.',
    template: { 
      _id: '102', 
      name: 'Fashion Store', 
      category: 'clothing',
      thumbnail: 'https://via.placeholder.com/300'
    },
  },
];

const mockOrders = [
  {
    _id: 'ORD123456',
    customer: { name: 'John Doe', email: 'john@example.com' },
    totalAmount: 42.99,
    status: 'delivered',
    website: { _id: '1', name: 'Pizza Palace' },
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    _id: 'ORD789012',
    customer: { name: 'Jane Smith', email: 'jane@example.com' },
    totalAmount: 89.50,
    status: 'processing',
    website: { _id: '2', name: 'Urban Fashion' },
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    _id: 'ORD345678',
    customer: { name: 'Mike Johnson', email: 'mike@example.com' },
    totalAmount: 129.99,
    status: 'shipped',
    website: { _id: '1', name: 'Pizza Palace' },
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
  },
];

const mockAnalytics = [
  {
    website: { _id: '1', name: 'Pizza Palace' },
    visitors: { total: 1245, daily: [] },
    sales: { total: 87, daily: [] },
  },
  {
    website: { _id: '2', name: 'Urban Fashion' },
    visitors: { total: 983, daily: [] },
    sales: { total: 42, daily: [] },
  },
];

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [websites, setWebsites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Simulate API loading
      setTimeout(() => {
        setWebsites(mockWebsites);
        setOrders(mockOrders);
        setAnalytics(mockAnalytics);
        setLoading(false);
      }, 1000);

      /* Original API code - commented out during development
      if (user?.token) {
        try {
          const api = authAPI(user.token);
          const [websitesRes, ordersRes, analyticsRes] = await Promise.all([
            api.get('/api/websites'),
            api.get('/api/orders'),
            api.get('/api/analytics'),
          ]);

          setWebsites(websitesRes.data);
          setOrders(ordersRes.data);
          setAnalytics(analyticsRes.data);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        } finally {
          setLoading(false);
        }
      }
      */
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Calculate total stats
  const totalWebsites = websites.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  
  // Get recent orders
  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/templates"
        >
          Create Website
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Website Stats */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Websites
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WebIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h4" component="div">
                  {totalWebsites}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to="/websites">
                View All
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Order Stats */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Orders
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ShoppingCartIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h4" component="div">
                  {totalOrders}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to="/orders">
                View All
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Revenue Stats */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Revenue
              </Typography>
              <Typography variant="h4" component="div">
                ${totalRevenue.toFixed(2)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to="/analytics">
                View Analytics
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* My Websites */}
      <Typography variant="h5" component="h2" gutterBottom>
        My Websites
      </Typography>

      {websites.length > 0 ? (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {websites.map((website) => (
            <Grid item xs={12} sm={6} md={4} key={website._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {website.name}
                  </Typography>
                  <Typography color="textSecondary" sx={{ mb: 1 }}>
                    {website.domain}
                  </Typography>
                  {website.template && (
                    <Chip
                      label={website.template.category}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  )}
                  <Typography variant="body2">
                    {website.description.slice(0, 100)}
                    {website.description.length > 100 ? '...' : ''}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    to={`/websites/${website._id}`}
                  >
                    Manage
                  </Button>
                  <Button
                    size="small"
                    component={Link}
                    to={`/websites/${website._id}/edit`}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    startIcon={<VisibilityIcon />}
                    href={getPreviewUrl(website.domain)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Preview
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            You haven't created any websites yet.
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={Link}
            to="/templates"
          >
            Create Your First Website
          </Button>
        </Box>
      )}

      {/* Recent Orders */}
      <Typography variant="h5" component="h2" gutterBottom>
        Recent Orders
      </Typography>

      {recentOrders.length > 0 ? (
        <Grid container spacing={3}>
          {recentOrders.map((order) => (
            <Grid item xs={12} sm={6} key={order._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Order #{order._id.slice(-6)}
                  </Typography>
                  <Typography color="textSecondary">
                    Customer: {order.customer.name}
                  </Typography>
                  <Typography variant="body2">
                    Amount: ${order.totalAmount.toFixed(2)}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={order.status}
                      color={
                        order.status === 'delivered'
                          ? 'success'
                          : order.status === 'cancelled'
                          ? 'error'
                          : 'primary'
                      }
                      size="small"
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    to={`/orders/${order._id}`}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="body1">
            No orders have been placed yet.
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default Dashboard;
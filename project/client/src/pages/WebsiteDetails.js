import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  CircularProgress,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import AuthContext from '../context/AuthContext';
import { authAPI } from '../utils/api';
import { getPreviewUrl } from '../utils/domainPreview';

const WebsiteDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  
  // Mock data for now
  const [orders, setOrders] = useState([
    {
      _id: 'ORD123456',
      customer: { name: 'John Doe', email: 'john@example.com' },
      totalAmount: 42.99,
      status: 'delivered',
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      _id: 'ORD789012',
      customer: { name: 'Jane Smith', email: 'jane@example.com' },
      totalAmount: 89.50,
      status: 'processing',
      createdAt: new Date(Date.now() - 172800000), // 2 days ago
    },
  ]);
  
  const [analytics, setAnalytics] = useState({
    visitors: { total: 1245, daily: [] },
    sales: { total: 87, daily: [] },
    revenue: { total: 4325.75, daily: [] },
  });

  useEffect(() => {
    const fetchWebsiteData = async () => {
      if (user?.token) {
        try {
          const api = authAPI(user.token);
          const response = await api.get(`/api/websites/${id}`);
          setWebsite(response.data);
          
          // In a real application, you would fetch these as well
          // const ordersRes = await api.get(`/api/websites/${id}/orders`);
          // setOrders(ordersRes.data);
          
          // const analyticsRes = await api.get(`/api/websites/${id}/analytics`);
          // setAnalytics(analyticsRes.data);
        } catch (error) {
          console.error('Error fetching website data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWebsiteData();
  }, [id, user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {website?.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {website?.domain}
          </Typography>
          <Chip 
            label={website?.isPublished ? 'Published' : 'Draft'} 
            color={website?.isPublished ? 'success' : 'default'}
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>
        <Box>
          <Button 
            variant="contained" 
            startIcon={<EditIcon />}
            component={Link}
            to={`/websites/${id}/edit`}
            sx={{ mr: 1 }}
          >
            Edit Website
          </Button>
          <Button
            variant="outlined"
            startIcon={<VisibilityIcon />}
            href={getPreviewUrl(website?.domain)}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Website
          </Button>
        </Box>
      </Box>
      
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Overview" />
        <Tab label="Orders" />
        <Tab label="Analytics" />
      </Tabs>
      
      {/* Overview Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Website Details</Typography>
                <Typography variant="body2" paragraph>
                  <strong>Description:</strong> {website?.description}
                </Typography>
                <Typography variant="body2">
                  <strong>Template:</strong> {website?.template?.name || 'Custom Template'}
                </Typography>
                <Typography variant="body2">
                  <strong>Created:</strong> {new Date(website?.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Quick Stats</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary">Visitors</Typography>
                    <Typography variant="h6">{analytics?.visitors?.total}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary">Orders</Typography>
                    <Typography variant="h6">{orders?.length || 0}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary">Revenue</Typography>
                    <Typography variant="h6">${analytics?.revenue?.total.toFixed(2)}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to="#analytics" onClick={() => setTabValue(2)}>
                  View Analytics
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Design Settings</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="subtitle2">Colors</Typography>
                    <Box sx={{ display: 'flex', mt: 1 }}>
                      <Box sx={{ 
                        width: 30, 
                        height: 30, 
                        bgcolor: website?.settings?.colors?.primary || '#3f51b5',
                        mr: 1,
                        borderRadius: 1
                      }} />
                      <Box sx={{ 
                        width: 30, 
                        height: 30, 
                        bgcolor: website?.settings?.colors?.secondary || '#f50057',
                        mr: 1,
                        borderRadius: 1
                      }} />
                      <Box sx={{ 
                        width: 30, 
                        height: 30, 
                        bgcolor: website?.settings?.colors?.background || '#ffffff',
                        border: '1px solid #ddd',
                        borderRadius: 1
                      }} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="subtitle2">Fonts</Typography>
                    <Typography variant="body2">
                      Headings: {website?.settings?.fonts?.heading || 'Roboto'}
                    </Typography>
                    <Typography variant="body2">
                      Body: {website?.settings?.fonts?.body || 'Open Sans'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="subtitle2">Layout</Typography>
                    <Typography variant="body2">
                      Header: {website?.settings?.layout?.headerStyle || 'Standard'}
                    </Typography>
                    <Typography variant="body2">
                      Footer: {website?.settings?.layout?.footerStyle || 'Standard'}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  component={Link} 
                  to={`/websites/${id}/edit`}
                  startIcon={<EditIcon />}
                >
                  Edit Design
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {/* Orders Tab */}
      {tabValue === 1 && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Recent Orders</Typography>
            <Button 
              variant="outlined" 
              size="small"
              startIcon={<ShoppingCartIcon />}
              component={Link}
              to="/orders"
            >
              All Orders
            </Button>
          </Box>
          
          {orders.length > 0 ? (
            <Grid container spacing={3}>
              {orders.map((order) => (
                <Grid item xs={12} sm={6} md={4} key={order._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Order #{order._id.slice(-6)}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </Typography>
                      <Box sx={{ my: 1 }}>
                        <Typography variant="body2">
                          <strong>Customer:</strong> {order.customer.name}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
                        </Typography>
                      </Box>
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
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1">
                No orders have been placed yet.
              </Typography>
            </Box>
          )}
        </>
      )}
      
      {/* Analytics Tab */}
      {tabValue === 2 && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Website Analytics</Typography>
            <Button 
              variant="outlined" 
              size="small"
              startIcon={<BarChartIcon />}
              component={Link}
              to="/analytics"
            >
              Full Analytics
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Visitors
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {analytics.visitors.total}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total unique visitors to your website
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Orders
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {analytics.sales.total}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total completed orders
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Revenue
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    ${analytics.revenue.total.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total revenue generated
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Traffic Sources
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                    Advanced analytics visualization will appear here
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default WebsiteDetails;

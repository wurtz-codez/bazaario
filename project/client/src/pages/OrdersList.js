import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AuthContext from '../context/AuthContext';
import { authAPI } from '../utils/api';

const OrdersList = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [websiteFilter, setWebsiteFilter] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.token) {
        try {
          const api = authAPI(user.token);
          const response = await api.get('/api/orders');
          setOrders(response.data);
          
          // Fetch websites
          const websitesResponse = await api.get('/api/websites');
          setWebsites(websitesResponse.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [user]);

  useEffect(() => {
    let filtered = orders;
    
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }
    
    if (websiteFilter) {
      filtered = filtered.filter((order) => order.website._id === websiteFilter);
    }
    
    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, websiteFilter, orders]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleWebsiteFilterChange = (e) => {
    setWebsiteFilter(e.target.value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'processing':
        return 'primary';
      case 'shipped':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
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
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1">
          Orders
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search orders by ID, customer name or email"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={statusFilter}
              label="Status"
              onChange={handleStatusFilterChange}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="website-filter-label">Website</InputLabel>
            <Select
              labelId="website-filter-label"
              value={websiteFilter}
              label="Website"
              onChange={handleWebsiteFilterChange}
            >
              <MenuItem value="">All Websites</MenuItem>
              {websites.map((site) => (
                <MenuItem key={site.id} value={site.id}>
                  {site.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {filteredOrders.length > 0 ? (
        <Grid container spacing={3}>
          {filteredOrders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Order #{order._id.slice(-6)}
                  </Typography>
                  <Typography color="textSecondary" sx={{ mb: 1 }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Customer:</strong> {order.customer.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Website:</strong> {order.website.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Amount:</strong> ${order.totalAmount.toFixed(2)}
                  </Typography>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
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
            {searchTerm || statusFilter || websiteFilter
              ? 'No orders match your search criteria.'
              : 'No orders have been placed yet.'}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default OrdersList;

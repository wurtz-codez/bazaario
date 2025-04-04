import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AuthContext from '../context/AuthContext';
import { authAPI } from '../utils/api';

const OrderDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (user?.token) {
        try {
          const api = authAPI(user.token);
          const response = await api.get(`/api/orders/${id}`);
          setOrder(response.data);
        } catch (error) {
          console.error('Error fetching order details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrderDetails();
  }, [id, user]);

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
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            component={Link}
            to="/orders"
            startIcon={<ArrowBackIcon />}
            sx={{ mr: 2 }}
          >
            Back to Orders
          </Button>
          <Typography variant="h4" component="h1">
            Order #{order._id.slice(-6)}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<ReceiptIcon />}
        >
          Print Invoice
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Order Summary</Typography>
                <Chip
                  label={order.status}
                  color={getStatusColor(order.status)}
                />
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">
                    Order Date
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">
                    Website
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {order.website.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">
                    Payment Method
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {order.paymentMethod}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">
                    Payment Status
                  </Typography>
                  <Chip
                    label={order.paymentStatus}
                    color={order.paymentStatus === 'paid' ? 'success' : 'warning'}
                    size="small"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Order Items
              </Typography>
              
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                        <TableCell align="right">${item.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2} />
                      <TableCell align="right">Subtotal</TableCell>
                      <TableCell align="right">${(order.totalAmount - order.tax - order.shipping).toFixed(2)}</TableCell>
                    </TableRow>
                    {order.tax > 0 && (
                      <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell align="right">Tax</TableCell>
                        <TableCell align="right">${order.tax.toFixed(2)}</TableCell>
                      </TableRow>
                    )}
                    {order.shipping > 0 && (
                      <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell align="right">Shipping</TableCell>
                        <TableCell align="right">${order.shipping.toFixed(2)}</TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell colSpan={2} />
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>Total</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>${order.totalAmount.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Customer Information
              </Typography>
              
              <Typography variant="body2" color="textSecondary">
                Name
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {order.customer.name}
              </Typography>
              
              <Typography variant="body2" color="textSecondary">
                Email
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {order.customer.email}
              </Typography>
              
              <Typography variant="body2" color="textSecondary">
                Phone
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {order.customer.phone}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body2" color="textSecondary">
                Shipping Address
              </Typography>
              <Typography variant="body1">
                {order.customer.address}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Order Timeline
              </Typography>
              
              <Box sx={{ display: 'flex', mb: 1 }}>
                <Box sx={{ width: 100 }}>
                  <Typography variant="body2" color="textSecondary">
                    Placed
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
              
              {order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? (
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Box sx={{ width: 100 }}>
                    <Typography variant="body2" color="textSecondary">
                      Processing
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              ) : null}
              
              {order.status === 'shipped' || order.status === 'delivered' ? (
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <Box sx={{ width: 100 }}>
                    <Typography variant="body2" color="textSecondary">
                      Shipped
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      {new Date(order.updatedAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              ) : null}
              
              {order.status === 'delivered' ? (
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ width: 100 }}>
                    <Typography variant="body2" color="textSecondary">
                      Delivered
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      {new Date(order.updatedAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              ) : null}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderDetails;

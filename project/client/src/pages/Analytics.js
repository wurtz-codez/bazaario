import React, { useState, useEffect, useContext } from 'react';
import { 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import AuthContext from '../context/AuthContext';
import { authAPI } from '../utils/api';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for development
const mockAnalytics = [
  {
    website: { 
      _id: '1', 
      name: 'Pizza Palace',
      domain: 'pizzapalace.bazaario.com' 
    },
    visitors: { 
      total: 1245, 
      daily: [
        { date: new Date(Date.now() - 6 * 86400000), count: 45 },
        { date: new Date(Date.now() - 5 * 86400000), count: 52 },
        { date: new Date(Date.now() - 4 * 86400000), count: 63 },
        { date: new Date(Date.now() - 3 * 86400000), count: 58 },
        { date: new Date(Date.now() - 2 * 86400000), count: 69 },
        { date: new Date(Date.now() - 1 * 86400000), count: 75 },
        { date: new Date(), count: 37 },
      ]
    },
    sales: { 
      total: 87, 
      daily: [
        { date: new Date(Date.now() - 6 * 86400000), count: 5, amount: 219.95 },
        { date: new Date(Date.now() - 5 * 86400000), count: 7, amount: 312.43 },
        { date: new Date(Date.now() - 4 * 86400000), count: 12, amount: 529.99 },
        { date: new Date(Date.now() - 3 * 86400000), count: 8, amount: 352.80 },
        { date: new Date(Date.now() - 2 * 86400000), count: 14, amount: 627.30 },
        { date: new Date(Date.now() - 1 * 86400000), count: 9, amount: 402.45 },
        { date: new Date(), count: 4, amount: 179.96 },
      ]
    },
    products: [
      { productId: 'prod1', name: 'Margherita Pizza', sales: 32, revenue: 415.68 },
      { productId: 'prod2', name: 'Pepperoni Pizza', sales: 28, revenue: 391.72 },
      { productId: 'prod3', name: 'Vegetarian Pizza', sales: 15, revenue: 209.85 },
      { productId: 'prod4', name: 'Hawaiian Pizza', sales: 12, revenue: 167.88 },
    ]
  },
  {
    website: { 
      _id: '2', 
      name: 'Urban Fashion',
      domain: 'urbanfashion.bazaario.com' 
    },
    visitors: { 
      total: 983, 
      daily: [
        { date: new Date(Date.now() - 6 * 86400000), count: 32 },
        { date: new Date(Date.now() - 5 * 86400000), count: 45 },
        { date: new Date(Date.now() - 4 * 86400000), count: 51 },
        { date: new Date(Date.now() - 3 * 86400000), count: 49 },
        { date: new Date(Date.now() - 2 * 86400000), count: 58 },
        { date: new Date(Date.now() - 1 * 86400000), count: 62 },
        { date: new Date(), count: 29 },
      ]
    },
    sales: { 
      total: 42, 
      daily: [
        { date: new Date(Date.now() - 6 * 86400000), count: 3, amount: 249.97 },
        { date: new Date(Date.now() - 5 * 86400000), count: 5, amount: 424.95 },
        { date: new Date(Date.now() - 4 * 86400000), count: 7, amount: 594.93 },
        { date: new Date(Date.now() - 3 * 86400000), count: 6, amount: 509.94 },
        { date: new Date(Date.now() - 2 * 86400000), count: 8, amount: 679.92 },
        { date: new Date(Date.now() - 1 * 86400000), count: 7, amount: 594.93 },
        { date: new Date(), count: 2, amount: 169.98 },
      ]
    },
    products: [
      { productId: 'prod5', name: 'Denim Jeans', sales: 15, revenue: 1274.85 },
      { productId: 'prod6', name: 'T-Shirt', sales: 12, revenue: 359.88 },
      { productId: 'prod7', name: 'Hooded Sweater', sales: 8, revenue: 559.92 },
      { productId: 'prod8', name: 'Casual Jacket', sales: 7, revenue: 629.93 },
    ]
  },
];

const Analytics = () => {
  const { user } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWebsite, setSelectedWebsite] = useState('');
  const [chartType, setChartType] = useState('line');
  const [dataType, setDataType] = useState('visitors');

  useEffect(() => {
    const fetchAnalytics = async () => {
      // Simulate API loading
      setTimeout(() => {
        setAnalytics(mockAnalytics);
        if (mockAnalytics.length > 0) {
          setSelectedWebsite(mockAnalytics[0].website._id);
        }
        setLoading(false);
      }, 1000);

      /* Original API code - commented out during development
      if (user?.token) {
        try {
          const api = authAPI(user.token);
          const { data } = await api.get('/api/analytics');
          setAnalytics(data);
          
          if (data.length > 0) {
            setSelectedWebsite(data[0].website._id);
          }
        } catch (error) {
          console.error('Error fetching analytics:', error);
        } finally {
          setLoading(false);
        }
      }
      */
    };

    fetchAnalytics();
  }, [user]);

  const handleWebsiteChange = (event) => {
    setSelectedWebsite(event.target.value);
  };

  const handleChartTypeChange = (event, newChartType) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  const handleDataTypeChange = (event) => {
    setDataType(event.target.value);
  };

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

  if (analytics.length === 0) {
    return (
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Analytics
        </Typography>
        <Typography variant="body1">
          No analytics data available yet. Analytics will be generated as your websites receive traffic and orders.
        </Typography>
      </Box>
    );
  }

  // Get the selected website's analytics
  const selectedAnalytics = analytics.find(
    (item) => item.website._id === selectedWebsite
  );

  // Prepare data for charts
  const prepareChartData = () => {
    if (!selectedAnalytics) return null;

    const isVisitors = dataType === 'visitors';
    const dailyData = isVisitors 
      ? selectedAnalytics.visitors.daily 
      : selectedAnalytics.sales.daily;

    // Sort data by date
    const sortedData = [...dailyData].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Prepare labels (dates)
    const labels = sortedData.map(item => {
      const date = new Date(item.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    // Prepare counts
    const counts = sortedData.map(item => item.count);
    
    // Prepare amounts (only for sales)
    const amounts = isVisitors ? [] : sortedData.map(item => item.amount);

    const datasets = [
      {
        label: isVisitors ? 'Visitors' : 'Orders',
        data: counts,
        backgroundColor: 'rgba(63, 81, 181, 0.5)',
        borderColor: 'rgba(63, 81, 181, 1)',
        borderWidth: 1,
      },
    ];

    if (!isVisitors) {
      datasets.push({
        label: 'Revenue',
        data: amounts,
        backgroundColor: 'rgba(245, 0, 87, 0.5)',
        borderColor: 'rgba(245, 0, 87, 1)',
        borderWidth: 1,
        yAxisID: 'y1',
      });
    }

    return {
      labels,
      datasets,
    };
  };

  const chartData = prepareChartData();

  // Options for line and bar charts
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: dataType === 'visitors' ? 'Visitor Traffic' : 'Sales & Revenue',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: dataType === 'visitors' ? 'Visitors' : 'Orders',
        },
      },
      ...(dataType === 'sales' && {
        y1: {
          beginAtZero: true,
          position: 'right',
          grid: {
            drawOnChartArea: false,
          },
          title: {
            display: true,
            text: 'Revenue ($)',
          },
        },
      }),
    },
  };

  // Prepare pie chart data for product sales
  const preparePieData = () => {
    if (!selectedAnalytics || !selectedAnalytics.products.length) return null;

    const labels = selectedAnalytics.products.map(product => product.name);
    const data = selectedAnalytics.products.map(product => product.sales);

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            'rgba(63, 81, 181, 0.7)',
            'rgba(245, 0, 87, 0.7)',
            'rgba(33, 150, 243, 0.7)',
            'rgba(76, 175, 80, 0.7)',
            'rgba(255, 152, 0, 0.7)',
            'rgba(156, 39, 176, 0.7)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const pieData = preparePieData();

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Analytics
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="website-select-label">Website</InputLabel>
              <Select
                labelId="website-select-label"
                id="website-select"
                value={selectedWebsite}
                label="Website"
                onChange={handleWebsiteChange}
              >
                {analytics.map((item) => (
                  <MenuItem key={item.website._id} value={item.website._id}>
                    {item.website.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="data-type-label">Data Type</InputLabel>
              <Select
                labelId="data-type-label"
                id="data-type"
                value={dataType}
                label="Data Type"
                onChange={handleDataTypeChange}
              >
                <MenuItem value="visitors">Visitors</MenuItem>
                <MenuItem value="sales">Sales</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <ToggleButtonGroup
              value={chartType}
              exclusive
              onChange={handleChartTypeChange}
              aria-label="chart type"
              fullWidth
            >
              <ToggleButton value="line" aria-label="line chart">
                <TimelineIcon />
              </ToggleButton>
              <ToggleButton value="bar" aria-label="bar chart">
                <BarChartIcon />
              </ToggleButton>
              <ToggleButton 
                value="pie" 
                aria-label="pie chart"
                disabled={dataType !== 'sales' || !selectedAnalytics?.products.length}
              >
                <PieChartIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Box>

      <Card>
        <CardContent>
          {chartType !== 'pie' ? (
            chartData ? (
              <Box sx={{ height: 400 }}>
                {chartType === 'line' ? (
                  <Line data={chartData} options={chartOptions} />
                ) : (
                  <Bar data={chartData} options={chartOptions} />
                )}
              </Box>
            ) : (
              <Typography>No data available for the selected options.</Typography>
            )
          ) : (
            pieData ? (
              <Box sx={{ height: 400 }}>
                <Pie 
                  data={pieData} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'Product Sales Distribution',
                      },
                    },
                  }} 
                />
              </Box>
            ) : (
              <Typography>No product data available for pie chart.</Typography>
            )
          )}
        </CardContent>
      </Card>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Visitors Overview
              </Typography>
              <Typography variant="h3">
                {selectedAnalytics?.visitors?.total || 0}
              </Typography>
              <Typography color="textSecondary">
                Total Visitors
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales Overview
              </Typography>
              <Typography variant="h3">
                {selectedAnalytics?.sales?.total || 0}
              </Typography>
              <Typography color="textSecondary">
                Total Orders
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Analytics;
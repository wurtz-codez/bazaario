import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AuthContext from '../context/AuthContext';
import { authAPI } from '../utils/api';

const TemplateSelection = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [filteredTemplates, setFilteredTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      if (user?.token) {
        try {
          const api = authAPI(user.token);
          const response = await api.get('/api/templates');
          setTemplates(response.data);
          setFilteredTemplates(response.data);
        } catch (error) {
          console.error('Error fetching templates:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTemplates();
  }, [user]);

  useEffect(() => {
    if (category) {
      setFilteredTemplates(templates.filter(template => template.category === category));
    } else {
      setFilteredTemplates(templates);
    }
  }, [category, templates]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTemplateSelect = (template) => {
    navigate(`/website-builder/new/${template._id}`);
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

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Choose a Template
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Select a template to start building your e-commerce website. You can customize colors, fonts, and content later.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="category-label">Filter by Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={category}
            label="Filter by Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="restaurant">Restaurant</MenuItem>
            <MenuItem value="ecommerce">E-Commerce</MenuItem>
            <MenuItem value="clothing">Clothing</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="services">Services</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredTemplates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={template.thumbnail}
                alt={template.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div">
                  {template.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                  Category: {template.category}
                </Typography>
                <Typography variant="body2">
                  {template.description}
                </Typography>

                {template.features && template.features.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">Features:</Typography>
                    <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                      {template.features.map((feature, index) => (
                        <li key={index}>
                          <Typography variant="body2">{feature}</Typography>
                        </li>
                      ))}
                    </ul>
                  </Box>
                )}
              </CardContent>
              <CardActions>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={() => handleTemplateSelect(template)}
                >
                  Select Template
                </Button>
                <Button 
                  size="small" 
                  href={template.previewUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Preview
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {filteredTemplates.length === 0 && (
          <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
            <Typography variant="h6">No templates found for this category.</Typography>
          </Box>
        )}
      </Grid>
    </div>
  );
};

export default TemplateSelection;

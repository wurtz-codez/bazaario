import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Tabs,
  Tab,
  Divider,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import ColorPicker from '@mui/material/colors';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
import AuthContext from '../context/AuthContext';
import { authAPI } from '../utils/api';
import { formatDomain, getDomainForDisplay, getPreviewUrl } from '../utils/domainPreview';

// Helper function to create default website object
const createDefaultWebsite = (template) => ({
  name: '',
  description: '',
  domain: '',
  template: template._id,
  settings: {
    colors: {
      primary: template?.settings?.colors?.primary || '#3f51b5',
      secondary: template?.settings?.colors?.secondary || '#f50057',
      background: template?.settings?.colors?.background || '#ffffff',
    },
    fonts: {
      heading: template?.settings?.fonts?.heading || 'Roboto',
      body: template?.settings?.fonts?.body || 'Open Sans',
    },
    layout: template?.settings?.layout || {},
  },
});

const WebsiteBuilder = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [template, setTemplate] = useState(null);
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState('');
  
  const fontOptions = [
    'Arial', 'Roboto', 'Open Sans', 'Lato', 'Montserrat',
    'Source Sans Pro', 'Raleway', 'Nunito', 'PT Sans', 'Merriweather'
  ];

  useEffect(() => {
    const fetchTemplateData = async () => {
      if (user?.token) {
        try {
          const api = authAPI(user.token);
          const response = await api.get(`/api/templates/${templateId}`);
          setTemplate(response.data);
          setWebsite(createDefaultWebsite(response.data));
          setPreviewUrl(response.data.previewUrl);
        } catch (error) {
          console.error('Error fetching template:', error);
          setSnackbar({
            open: true,
            message: 'Failed to load template data',
            severity: 'error',
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTemplateData();
  }, [templateId, user]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWebsite({
      ...website,
      [name]: value,
    });
  };

  const handleColorChange = (colorType, value) => {
    setWebsite({
      ...website,
      settings: {
        ...website.settings,
        colors: {
          ...website.settings.colors,
          [colorType]: value,
        },
      },
    });
  };

  const handleFontChange = (fontType, value) => {
    setWebsite({
      ...website,
      settings: {
        ...website.settings,
        fonts: {
          ...website.settings.fonts,
          [fontType]: value,
        },
      },
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!website.name.trim()) newErrors.name = 'Name is required';
    if (!website.description.trim()) newErrors.description = 'Description is required';
    
    if (!website.domain.trim()) {
      newErrors.domain = 'Subdomain is required';
    } else if (!/^[a-zA-Z0-9][-a-zA-Z0-9]*$/.test(website.domain)) {
      newErrors.domain = 'Enter a valid subdomain using only letters, numbers, and hyphens';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      const api = authAPI(user.token);
      
      // Format the website data properly
      const websiteData = {
        name: website.name,
        description: website.description,
        domain: formatDomain(website.domain),
        templateId: template._id,
        settings: website.settings,
      };
      
      console.log('Submitting website data:', websiteData);
      
      const response = await api.post('/api/websites', websiteData);
      
      setSnackbar({
        open: true,
        message: 'Website created successfully!',
        severity: 'success',
      });
      
      setTimeout(() => {
        navigate(`/websites/${response.data._id}`);
      }, 1500);
    } catch (error) {
      console.error('Error creating website:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to create website. Please try again.',
        severity: 'error',
      });
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (e, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };
  
  const handlePreview = () => {
    const previewUrl = website.domain ? getPreviewUrl(website.domain) : template.previewUrl;
    window.open(previewUrl, '_blank');
  };

  if (loading && !website) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Your Website
      </Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Basic Information" />
          <Tab label="Design" />
          <Tab label="Preview" />
        </Tabs>
      </Paper>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: activeTab === 0 ? 'block' : 'none' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Website Name"
                name="name"
                value={website.name}
                onChange={handleInputChange}
                required
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={website.description}
                onChange={handleInputChange}
                multiline
                rows={3}
                required
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subdomain"
                name="domain"
                value={website.domain}
                onChange={handleInputChange}
                required
                error={!!errors.domain}
                helperText={errors.domain || 'Enter a subdomain for your website'}
                InputProps={{
                  endAdornment: <InputAdornment position="end">.preview.bazaario.com</InputAdornment>,
                }}
              />
              <Typography variant="caption" color="textSecondary">
                Your website will be accessible at: {getDomainForDisplay(website.domain || '')}
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Selected Template: {template?.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {template?.description}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        
        <Box sx={{ display: activeTab === 1 ? 'block' : 'none' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Color Scheme
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2">Primary Color</Typography>
                  <input
                    type="color"
                    value={website.settings.colors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    style={{ width: '100%', height: '40px' }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2">Secondary Color</Typography>
                  <input
                    type="color"
                    value={website.settings.colors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    style={{ width: '100%', height: '40px' }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2">Background Color</Typography>
                  <input
                    type="color"
                    value={website.settings.colors.background}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                    style={{ width: '100%', height: '40px' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Typography
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="heading-font-label">Heading Font</InputLabel>
                    <Select
                      labelId="heading-font-label"
                      value={website.settings.fonts.heading}
                      label="Heading Font"
                      onChange={(e) => handleFontChange('heading', e.target.value)}
                    >
                      {fontOptions.map((font) => (
                        <MenuItem key={font} value={font} style={{ fontFamily: font }}>
                          {font}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="body-font-label">Body Font</InputLabel>
                    <Select
                      labelId="body-font-label"
                      value={website.settings.fonts.body}
                      label="Body Font"
                      onChange={(e) => handleFontChange('body', e.target.value)}
                    >
                      {fontOptions.map((font) => (
                        <MenuItem key={font} value={font} style={{ fontFamily: font }}>
                          {font}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        
        <Box sx={{ display: activeTab === 2 ? 'block' : 'none' }}>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" gutterBottom>
              Preview Your Website
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Click the button below to see a preview of how your website will look.
              Note: This preview is based on the template and may not reflect all your customizations.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<PreviewIcon />}
              onClick={handlePreview}
              sx={{ mt: 2 }}
            >
              Open Preview
            </Button>
            
            <Box 
              sx={{ 
                mt: 4, 
                p: 2, 
                border: '1px solid #ddd',
                borderRadius: 1,
                backgroundColor: website.settings.colors.background
              }}
            >
              <Typography 
                variant="h4" 
                gutterBottom
                sx={{ 
                  color: website.settings.colors.primary,
                  fontFamily: website.settings.fonts.heading
                }}
              >
                {website.name || 'Your Website Name'}
              </Typography>
              
              <Typography 
                variant="body1"
                sx={{ 
                  color: '#333',
                  fontFamily: website.settings.fonts.body
                }}
              >
                {website.description || 'Your website description will appear here.'}
              </Typography>
              
              <Button
                sx={{ 
                  mt: 2,
                  backgroundColor: website.settings.colors.primary,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: website.settings.colors.secondary,
                  }
                }}
              >
                Sample Button
              </Button>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          {activeTab > 0 && (
            <Button 
              variant="outlined"
              onClick={() => setActiveTab(activeTab - 1)}
            >
              Previous
            </Button>
          )}
          
          <Box sx={{ flex: '1 1 auto' }} />
          
          {activeTab < 2 ? (
            <Button 
              variant="contained"
              onClick={() => setActiveTab(activeTab + 1)}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Website'}
            </Button>
          )}
        </Box>
      </form>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default WebsiteBuilder;

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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  InputAdornment,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthContext from '../context/AuthContext';
import { authAPI } from '../utils/api';
import { formatDomain, getDomainForDisplay, getPreviewUrl } from '../utils/domainPreview';

const WebsiteEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [errors, setErrors] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  
  const fontOptions = [
    'Arial', 'Roboto', 'Open Sans', 'Lato', 'Montserrat',
    'Source Sans Pro', 'Raleway', 'Nunito', 'PT Sans', 'Merriweather'
  ];

  useEffect(() => {
    const fetchWebsite = async () => {
      if (user?.token) {
        try {
          const api = authAPI(user.token);
          const response = await api.get(`/api/websites/${id}`);
          setWebsite(response.data);
        } catch (error) {
          console.error('Error fetching website:', error);
          setSnackbar({
            open: true,
            message: 'Failed to load website data',
            severity: 'error',
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWebsite();
  }, [id, user]);

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
  
  const handleFeatureChange = (featureName, checked) => {
    setWebsite({
      ...website,
      settings: {
        ...website.settings,
        features: {
          ...website.settings.features,
          [featureName]: checked,
        },
      },
    });
  };
  
  const handleSocialChange = (platform, value) => {
    setWebsite({
      ...website,
      settings: {
        ...website.settings,
        social: {
          ...website.settings.social,
          [platform]: value,
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
      setSaving(true);
      const api = authAPI(user.token);
      const websiteData = {
        name: website.name,
        description: website.description,
        domain: website.domain,
        settings: website.settings,
        isPublished: website.isPublished
      };
      
      await api.put(`/api/websites/${id}`, websiteData);
      
      setSnackbar({
        open: true,
        message: 'Website updated successfully!',
        severity: 'success',
      });
      setSaving(false);
    } catch (error) {
      console.error('Error updating website:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to update website',
        severity: 'error',
      });
      setSaving(false);
    }
  };

  const handleDeleteWebsite = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      setSnackbar({
        open: true,
        message: 'Click delete again to confirm',
        severity: 'warning',
      });
      return;
    }
    
    try {
      setSaving(true);
      const api = authAPI(user.token);
      await api.delete(`/api/websites/${id}`);
      
      setSnackbar({
        open: true,
        message: 'Website deleted successfully!',
        severity: 'success',
      });
      
      setTimeout(() => {
        navigate('/websites');
      }, 1500);
    } catch (error) {
      console.error('Error deleting website:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to delete website',
        severity: 'error',
      });
      setSaving(false);
    }
  };

  const handlePublishChange = (e) => {
    const { checked } = e.target;
    setWebsite({
      ...website,
      isPublished: checked,
    });
  };

  const handleCloseSnackbar = (e, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Edit Website
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteWebsite}
        >
          {deleteConfirm ? 'Confirm Delete' : 'Delete Website'}
        </Button>
      </Box>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Basic Information" />
          <Tab label="Design" />
          <Tab label="Features" />
          <Tab label="Social Media" />
          <Tab label="SEO" />
        </Tabs>
      </Paper>

      <form onSubmit={handleSubmit}>
        {/* Basic Information Tab */}
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
              <FormControlLabel
                control={
                  <Switch
                    checked={website.isPublished || false}
                    onChange={handlePublishChange}
                    name="isPublished"
                    color="primary"
                  />
                }
                label="Publish Website"
              />
              <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                When published, your website will be accessible to visitors.
              </Typography>
            </Grid>
          </Grid>
        </Box>
        
        {/* Design Tab */}
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
                    value={website.settings?.colors?.primary || '#3f51b5'}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    style={{ width: '100%', height: '40px' }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2">Secondary Color</Typography>
                  <input
                    type="color"
                    value={website.settings?.colors?.secondary || '#f50057'}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    style={{ width: '100%', height: '40px' }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2">Background Color</Typography>
                  <input
                    type="color"
                    value={website.settings?.colors?.background || '#ffffff'}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                    style={{ width: '100%', height: '40px' }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Text Color</Typography>
                  <input
                    type="color"
                    value={website.settings?.colors?.text || '#333333'}
                    onChange={(e) => handleColorChange('text', e.target.value)}
                    style={{ width: '100%', height: '40px' }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Accent Color</Typography>
                  <input
                    type="color"
                    value={website.settings?.colors?.accent || '#4caf50'}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
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
                      value={website.settings?.fonts?.heading || 'Roboto'}
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
                      value={website.settings?.fonts?.body || 'Open Sans'}
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
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Layout Settings
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="header-style-label">Header Style</InputLabel>
                    <Select
                      labelId="header-style-label"
                      value={website.settings?.layout?.headerStyle || 'standard'}
                      label="Header Style"
                      onChange={(e) => {
                        setWebsite({
                          ...website,
                          settings: {
                            ...website.settings,
                            layout: {
                              ...website.settings.layout,
                              headerStyle: e.target.value,
                            },
                          },
                        });
                      }}
                    >
                      <MenuItem value="standard">Standard</MenuItem>
                      <MenuItem value="minimal">Minimal</MenuItem>
                      <MenuItem value="centered">Centered</MenuItem>
                      <MenuItem value="split">Split</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="footer-style-label">Footer Style</InputLabel>
                    <Select
                      labelId="footer-style-label"
                      value={website.settings?.layout?.footerStyle || 'standard'}
                      label="Footer Style"
                      onChange={(e) => {
                        setWebsite({
                          ...website,
                          settings: {
                            ...website.settings,
                            layout: {
                              ...website.settings.layout,
                              footerStyle: e.target.value,
                            },
                          },
                        });
                      }}
                    >
                      <MenuItem value="standard">Standard</MenuItem>
                      <MenuItem value="minimal">Minimal</MenuItem>
                      <MenuItem value="expanded">Expanded</MenuItem>
                      <MenuItem value="centered">Centered</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="content-width-label">Content Width</InputLabel>
                    <Select
                      labelId="content-width-label"
                      value={website.settings?.layout?.contentWidth || 'contained'}
                      label="Content Width"
                      onChange={(e) => {
                        setWebsite({
                          ...website,
                          settings: {
                            ...website.settings,
                            layout: {
                              ...website.settings.layout,
                              contentWidth: e.target.value,
                            },
                          },
                        });
                      }}
                    >
                      <MenuItem value="contained">Contained</MenuItem>
                      <MenuItem value="wide">Wide</MenuItem>
                      <MenuItem value="fullWidth">Full Width</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="product-display-label">Product Display</InputLabel>
                    <Select
                      labelId="product-display-label"
                      value={website.settings?.layout?.productDisplayStyle || 'grid'}
                      label="Product Display"
                      onChange={(e) => {
                        setWebsite({
                          ...website,
                          settings: {
                            ...website.settings,
                            layout: {
                              ...website.settings.layout,
                              productDisplayStyle: e.target.value,
                            },
                          },
                        });
                      }}
                    >
                      <MenuItem value="grid">Grid</MenuItem>
                      <MenuItem value="list">List</MenuItem>
                      <MenuItem value="slider">Image Slider</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        
        {/* Features Tab */}
        <Box sx={{ display: activeTab === 2 ? 'block' : 'none' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                E-commerce Features
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={website.settings?.features?.enableCart !== false}
                        onChange={(e) => handleFeatureChange('enableCart', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Shopping Cart"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={website.settings?.features?.enableWishlist !== false}
                        onChange={(e) => handleFeatureChange('enableWishlist', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Wishlist"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={website.settings?.features?.enableSearch !== false}
                        onChange={(e) => handleFeatureChange('enableSearch', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Product Search"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={website.settings?.features?.enableReviews !== false}
                        onChange={(e) => handleFeatureChange('enableReviews', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Product Reviews"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={website.settings?.features?.enableBlog || false}
                        onChange={(e) => handleFeatureChange('enableBlog', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Blog"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        
        {/* Social Media Tab */}
        <Box sx={{ display: activeTab === 3 ? 'block' : 'none' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Social Media Links
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Facebook URL"
                    value={website.settings?.social?.facebook || ''}
                    onChange={(e) => handleSocialChange('facebook', e.target.value)}
                    placeholder="https://facebook.com/yourbusiness"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Instagram URL"
                    value={website.settings?.social?.instagram || ''}
                    onChange={(e) => handleSocialChange('instagram', e.target.value)}
                    placeholder="https://instagram.com/yourbusiness"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Twitter URL"
                    value={website.settings?.social?.twitter || ''}
                    onChange={(e) => handleSocialChange('twitter', e.target.value)}
                    placeholder="https://twitter.com/yourbusiness"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="YouTube URL"
                    value={website.settings?.social?.youtube || ''}
                    onChange={(e) => handleSocialChange('youtube', e.target.value)}
                    placeholder="https://youtube.com/channel/yourbusiness"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        
        {/* SEO Tab */}
        <Box sx={{ display: activeTab === 4 ? 'block' : 'none' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Search Engine Optimization
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="SEO Title"
                    value={website.settings?.seo?.title || ''}
                    onChange={(e) => {
                      setWebsite({
                        ...website,
                        settings: {
                          ...website.settings,
                          seo: {
                            ...website.settings?.seo,
                            title: e.target.value,
                          },
                        },
                      });
                    }}
                    placeholder="Your Website Title - Best Products Online"
                    helperText="This will appear in search engine results and browser tabs"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Meta Description"
                    value={website.settings?.seo?.description || ''}
                    onChange={(e) => {
                      setWebsite({
                        ...website,
                        settings: {
                          ...website.settings,
                          seo: {
                            ...website.settings?.seo,
                            description: e.target.value,
                          },
                        },
                      });
                    }}
                    placeholder="A brief description of your website that will appear in search results"
                    multiline
                    rows={2}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Keywords"
                    value={website.settings?.seo?.keywords || ''}
                    onChange={(e) => {
                      setWebsite({
                        ...website,
                        settings: {
                          ...website.settings,
                          seo: {
                            ...website.settings?.seo,
                            keywords: e.target.value,
                          },
                        },
                      });
                    }}
                    placeholder="e-commerce, online store, products (comma separated)"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
          
          {activeTab < 4 ? (
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
              disabled={saving}
            >
              {saving ? <CircularProgress size={24} /> : 'Save Changes'}
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

export default WebsiteEdit;

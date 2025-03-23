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
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import AuthContext from '../context/AuthContext';
import { authAPI } from '../utils/api';
import { getPreviewUrl } from '../utils/domainPreview';

const WebsitesList = () => {
  const { user } = useContext(AuthContext);
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWebsites, setFilteredWebsites] = useState([]);

  useEffect(() => {
    const fetchWebsites = async () => {
      if (user?.token) {
        try {
          const api = authAPI(user.token);
          const response = await api.get('/api/websites');
          setWebsites(response.data);
          setFilteredWebsites(response.data);
        } catch (error) {
          console.error('Error fetching websites:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWebsites();
  }, [user]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = websites.filter(
        (website) =>
          website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          website.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
          website.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredWebsites(filtered);
    } else {
      setFilteredWebsites(websites);
    }
  }, [searchTerm, websites]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
        <Typography variant="h4" component="h1">
          My Websites
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

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search websites by name, domain or description"
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
      </Box>

      {filteredWebsites.length > 0 ? (
        <Grid container spacing={3}>
          {filteredWebsites.map((website) => (
            <Grid item xs={12} sm={6} md={4} key={website._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {website.name}
                  </Typography>
                  <Typography color="textSecondary" sx={{ mb: 1 }}>
                    {website.domain}
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    {website.template && (
                      <Chip
                        label={website.template.category}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                    )}
                    <Chip 
                      label={website.isPublished ? 'Published' : 'Draft'} 
                      color={website.isPublished ? 'success' : 'default'}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                  </Box>
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
                    startIcon={<VisibilityIcon />}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    component={Link}
                    to={`/websites/${website._id}/edit`}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    href={getPreviewUrl(website.domain)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Site
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" paragraph>
            {searchTerm
              ? 'No websites match your search criteria.'
              : "You haven't created any websites yet."}
          </Typography>
          {!searchTerm && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              component={Link}
              to="/templates"
            >
              Create Your First Website
            </Button>
          )}
        </Box>
      )}
    </div>
  );
};

export default WebsitesList;

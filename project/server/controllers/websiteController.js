const Website = require('../models/Website');
const Template = require('../models/Template');

// @desc    Create a new website
// @route   POST /api/websites
// @access  Private
const createWebsite = async (req, res) => {
  try {
    console.log('Create website request received:', req.body);
    const { name, description, domain, templateId, settings } = req.body;

    if (!name || !description || !domain || !templateId) {
      return res.status(400).json({ 
        message: 'Please provide all required fields (name, description, domain, templateId)' 
      });
    }

    // Format domain - strip any protocol and trailing slashes
    const formattedDomain = domain
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '')
      .replace(/\.preview\.bazaario\.com$/, '')
      .replace(/\.bazaario\.com$/, '');

    // Check if domain already exists
    const domainExists = await Website.findOne({ 
      domain: new RegExp(`^${formattedDomain}$`, 'i') 
    });

    if (domainExists) {
      return res.status(400).json({ message: 'Subdomain already in use' });
    }

    // Check if template exists
    const template = await Template.findById(templateId);

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    // Create website with formatted domain
    const website = await Website.create({
      name,
      description,
      domain: formattedDomain,
      template: templateId,
      owner: req.user._id,
      settings: settings || {},
    });

    if (website) {
      // Populate template information before returning
      const populatedWebsite = await Website.findById(website._id).populate('template', 'name category');
      res.status(201).json(populatedWebsite);
    } else {
      res.status(400).json({ message: 'Invalid website data' });
    }
  } catch (error) {
    console.error('Website creation error:', error);
    res.status(500).json({ 
      message: 'Server Error', 
      error: error.message 
    });
  }
};

// @desc    Get all websites for a user
// @route   GET /api/websites
// @access  Private
const getUserWebsites = async (req, res) => {
  try {
    const websites = await Website.find({ owner: req.user._id })
      .populate('template', 'name category thumbnail')
      .sort({ createdAt: -1 });

    res.json(websites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get website by ID
// @route   GET /api/websites/:id
// @access  Private
const getWebsiteById = async (req, res) => {
  try {
    const website = await Website.findById(req.params.id).populate(
      'template',
      'name category features'
    );

    if (website) {
      // Check if the user is the owner of the website
      if (website.owner.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      res.json(website);
    } else {
      res.status(404).json({ message: 'Website not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update website
// @route   PUT /api/websites/:id
// @access  Private
const updateWebsite = async (req, res) => {
  try {
    const { name, description, domain, settings, isPublished } = req.body;

    const website = await Website.findById(req.params.id);

    if (website) {
      // Check if the user is the owner of the website
      if (website.owner.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      // Format domain if provided
      let formattedDomain = website.domain;
      if (domain) {
        formattedDomain = domain
          .replace(/^https?:\/\//, '')
          .replace(/\/$/, '')
          .replace(/\.preview\.bazaario\.com$/, '')
          .replace(/\.bazaario\.com$/, '');

        // Check if domain changed and if it's already in use
        if (formattedDomain !== website.domain) {
          const domainExists = await Website.findOne({ 
            domain: new RegExp(`^${formattedDomain}$`, 'i')
          });

          if (domainExists) {
            return res.status(400).json({ message: 'Subdomain already in use' });
          }
        }
      }

      website.name = name || website.name;
      website.description = description || website.description;
      website.domain = formattedDomain;
      website.settings = settings || website.settings;

      if (isPublished !== undefined) {
        website.isPublished = isPublished;
      }

      const updatedWebsite = await website.save();
      res.json(updatedWebsite);
    } else {
      res.status(404).json({ message: 'Website not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete website
// @route   DELETE /api/websites/:id
// @access  Private
const deleteWebsite = async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);

    if (website) {
      // Check if the user is the owner of the website
      if (website.owner.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      await website.deleteOne();
      res.json({ message: 'Website removed' });
    } else {
      res.status(404).json({ message: 'Website not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createWebsite,
  getUserWebsites,
  getWebsiteById,
  updateWebsite,
  deleteWebsite,
};
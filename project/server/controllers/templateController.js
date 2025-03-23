const Template = require('../models/Template');

// @desc    Get all templates
// @route   GET /api/templates
// @access  Public
const getTemplates = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category, isActive: true } : { isActive: true };

    const templates = await Template.find(filter).sort({ createdAt: -1 });
    res.json(templates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get template by ID
// @route   GET /api/templates/:id
// @access  Public
const getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (template && template.isActive) {
      res.json(template);
    } else {
      res.status(404).json({ message: 'Template not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get templates by category
// @route   GET /api/templates/category/:category
// @access  Public
const getTemplatesByCategory = async (req, res) => {
  try {
    const templates = await Template.find({
      category: req.params.category,
      isActive: true,
    });

    if (templates.length > 0) {
      res.json(templates);
    } else {
      res.status(404).json({ message: 'No templates found for this category' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new template (admin only)
// @route   POST /api/templates
// @access  Private/Admin
const createTemplate = async (req, res) => {
  try {
    const { name, description, category, thumbnail, previewUrl, features } = req.body;

    const template = await Template.create({
      name,
      description,
      category,
      thumbnail,
      previewUrl,
      features: features || [],
    });

    if (template) {
      res.status(201).json(template);
    } else {
      res.status(400).json({ message: 'Invalid template data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update template (admin only)
// @route   PUT /api/templates/:id
// @access  Private/Admin
const updateTemplate = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      thumbnail,
      previewUrl,
      features,
      isActive,
    } = req.body;

    const template = await Template.findById(req.params.id);

    if (template) {
      template.name = name || template.name;
      template.description = description || template.description;
      template.category = category || template.category;
      template.thumbnail = thumbnail || template.thumbnail;
      template.previewUrl = previewUrl || template.previewUrl;
      template.features = features || template.features;
      
      if (isActive !== undefined) {
        template.isActive = isActive;
      }

      const updatedTemplate = await template.save();
      res.json(updatedTemplate);
    } else {
      res.status(404).json({ message: 'Template not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete template (admin only)
// @route   DELETE /api/templates/:id
// @access  Private/Admin
const deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (template) {
      await template.deleteOne();
      res.json({ message: 'Template removed' });
    } else {
      res.status(404).json({ message: 'Template not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getTemplates,
  getTemplateById,
  getTemplatesByCategory,
  createTemplate,
  updateTemplate,
  deleteTemplate,
}; 
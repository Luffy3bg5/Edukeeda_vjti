const Item = require('../models/Item');

// @desc    Get all items (with filters)
exports.getItems = async (req, res) => {
  try {
    const { type, domain, locationType, status = 'approved' } = req.query;
    let query = { status };

    if (type) query.type = type;
    if (domain) query.domain = domain;
    if (locationType) query.locationType = locationType;

    const items = await Item.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single item
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new item (Admin)
exports.createItem = async (req, res) => {
  try {
    const { title, type, description, eligibility, domain, locationType, location, externalLink, imageUrl } = req.body;
    
    // Support file upload via Cloudinary array if passed
    const imgUrl = req.file ? req.file.path : imageUrl;

    const item = await Item.create({
      title, type, description, eligibility, domain, locationType, location, externalLink,
      imageUrl: imgUrl,
      postedBy: req.user._id,
      status: 'approved'
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update item (Admin)
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete item (Admin)
exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

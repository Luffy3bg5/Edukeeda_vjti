const Item = require('../models/Item');

// @desc    Global Search across items
exports.globalSearch = async (req, res) => {
  try {
    const { q, type, domain, page = 1, limit = 10 } = req.query;
    let query = { status: 'approved' };

    // Text Search
    if (q) {
      query.$text = { $search: q };
    }

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Filter by domain
    if (domain) {
      query.domain = domain;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Only sort by text score if a query is provided
    let sortConfig = { createdAt: -1 };
    let selectConfig = '';

    if (q) {
      sortConfig = { score: { $meta: "textScore" } };
      selectConfig = { score: { $meta: "textScore" } };
    }

    const items = await Item.find(query, selectConfig)
                            .sort(sortConfig)
                            .skip(skip)
                            .limit(parseInt(limit));
                            
    const total = await Item.countDocuments(query);

    res.json({
      results: items,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

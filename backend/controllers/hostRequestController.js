const HostRequest = require('../models/HostRequest');
const Item = require('../models/Item');

// @desc    Candidate creates a new host request
exports.createHostRequest = async (req, res) => {
  try {
    const { eventType, details } = req.body;
    
    // Resume/Banner can be uploaded, assuming image in req.file if provided
    if (req.file) {
      details.imageUrl = req.file.path; // Save cloudinary URL
    }

    const request = await HostRequest.create({
      candidateId: req.user._id,
      eventType,
      details
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Candidate's own host requests
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await HostRequest.find({ candidateId: req.user._id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin: Get all host requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await HostRequest.find({}).populate('candidateId', 'name email').sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin: Approve/Reject request
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status, adminFeedback } = req.body;
    const request = await HostRequest.findById(req.params.id);

    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = status;
    if (adminFeedback) request.adminFeedback = adminFeedback;
    await request.save();

    // If approved, automatically add it to the main Items collection
    if (status === 'approved') {
      await Item.create({
        title: request.details.title,
        type: request.eventType,
        description: request.details.description,
        startDate: request.details.startDate,
        endDate: request.details.endDate,
        email: request.details.email,
        gender: request.details.gender,
        audience: request.details.audience,
        eligibility: request.details.eligibility,
        externalLink: request.details.externalLink,
        domain: request.details.domain,
        locationType: request.details.locationType,
        location: request.details.location,
        dynamicFields: request.details.dynamicFields,
        imageUrl: request.details.imageUrl,
        postedBy: req.user._id // The admin who approved it
      });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

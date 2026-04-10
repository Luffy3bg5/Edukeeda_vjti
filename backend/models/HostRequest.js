const mongoose = require('mongoose');

const HostRequestSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventType: { 
    type: String, 
    enum: ['Scholarship', 'Loan', 'Competition', 'Hackathon', 'Event', 'Internship'],
    required: true
  },
  details: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    eligibility: { type: String },
    externalLink: { type: String },
    locationType: { type: String },
    domain: { type: String }
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminFeedback: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('HostRequest', HostRequestSchema);

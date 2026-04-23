const mongoose = require('mongoose');

const HostRequestSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventType: { 
    type: String, 
    enum: ['Scholarship', 'Loan', 'Competition', 'Hackathon', 'Event', 'Internship', 'Cultural Event', 'College Event', 'Conference', 'Course'],
    required: true
  },
  details: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    email: { type: String },
    gender: { type: String, enum: ['All', 'Male', 'Female', 'Other'], default: 'All' },
    audience: { type: String, enum: ['Anyone', 'Students', 'Professionals', 'Beginners'], default: 'Anyone' },
    eligibility: { type: String },
    externalLink: { type: String },
    locationType: { type: String },
    location: { type: String },
    domain: { type: String },
    dynamicFields: { type: mongoose.Schema.Types.Mixed }
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminFeedback: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('HostRequest', HostRequestSchema);

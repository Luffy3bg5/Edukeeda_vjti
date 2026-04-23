const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Scholarship', 'Loan', 'Competition', 'Hackathon', 'Cultural Event', 'College Event', 'Conference', 'Course', 'Internship'],
    required: true
  },
  startDate: { type: Date },
  endDate: { type: Date },
  email: { type: String },
  gender: { type: String, enum: ['All', 'Male', 'Female', 'Other'], default: 'All' },
  audience: { type: String, enum: ['Anyone', 'Students', 'Professionals', 'Beginners'], default: 'Anyone' },
  description: { type: String, required: true },
  eligibility: { type: String },
  domain: { type: String }, // AI/ML, Web Dev, etc.
  locationType: { type: String, enum: ['Online', 'Offline'], default: 'Online' },
  location: { type: String },
  externalLink: { type: String },
  dynamicFields: { type: mongoose.Schema.Types.Mixed },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
  imageUrl: { type: String }, // For banner
}, { timestamps: true });

// $text indexing for Advanced Global Search
ItemSchema.index({
  title: 'text',
  description: 'text',
  type: 'text',
  domain: 'text'
});

module.exports = mongoose.model('Item', ItemSchema);

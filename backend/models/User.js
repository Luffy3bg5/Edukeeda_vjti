const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Google OAuth / OTP users
  phone: { type: String },
  role: { type: String, enum: ['candidate', 'employer'], default: 'candidate' },
  authProvider: { type: String, enum: ['local', 'google', 'otp'], default: 'local' },
  
  // Extra fields for Candidates
  educationDetails: { type: String },
  category: { type: String, enum: ['Student', 'Professional', 'Others'] },
  skills: [{ type: String }],
  interests: [{ type: String }],
  location: { type: String },
  resumeUrl: { type: String },
  
  // Password Reset
  resetOtp: { type: String },
  resetOtpExpires: { type: Date },
  
  // Phone OTP
  phoneOtp: { type: String },
  phoneOtpExpires: { type: Date }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

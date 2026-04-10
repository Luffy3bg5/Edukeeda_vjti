const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new Candidate
exports.registerCandidate = async (req, res) => {
  try {
    const { name, email, password, phone, educationDetails, category, skills, interests, location } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name, email, password: hashedPassword, phone, role: 'candidate',
      educationDetails, category, skills, interests, location
    });

    if (user) {
      res.status(201).json({
        _id: user.id, name: user.name, email: user.email, role: user.role,
        token: generateToken(user._id, user.role)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login generic (Candidate/Employer)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id, name: user.name, email: user.email, role: user.role,
        token: generateToken(user._id, user.role)
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mock Auth Controllers
exports.mockGoogleAuth = async (req, res) => {
  try {
    const { email, name } = req.body; // In real flow, verify Google Token here
    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({
        name, email, authProvider: 'google', role: 'candidate'
      });
    }

    res.json({
      _id: user.id, name: user.name, email: user.email, role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.mockOtpAuth = async (req, res) => {
  try {
    const { phone } = req.body;
    // Mocking OTP validation logic. Assume valid.
    let user = await User.findOne({ phone });
    if (!user) {
      // Create barebones user
      user = await User.create({
        name: `User_${phone.slice(-4)}`, email: `${phone}@demo.com`, phone, authProvider: 'otp', role: 'candidate'
      });
    }
    
    res.json({
      _id: user.id, name: user.name, email: user.email, role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

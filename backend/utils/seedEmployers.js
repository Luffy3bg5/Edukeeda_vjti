const User = require('../models/User');
const bcrypt = require('bcryptjs');

const seedEmployers = async () => {
  try {
    const employerEmail = 'employer@edukeeda.demo';
    const exists = await User.findOne({ email: employerEmail });
    if (!exists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      const employer = new User({
        name: 'Demo Employer Admin',
        email: employerEmail,
        password: hashedPassword,
        role: 'employer',
        authProvider: 'local'
      });
      await employer.save();
      console.log('Seeded default employer: employer@edukeeda.demo / admin123');
    }
  } catch (error) {
    console.error('Seeding employer failed:', error);
  }
};

module.exports = seedEmployers;

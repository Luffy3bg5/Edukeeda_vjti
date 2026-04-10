const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default Route
app.get('/', (req, res) => {
  res.send('EduKeeda API is running...');
});

// Seed Employers if not exists
const seedEmployers = require('./utils/seedEmployers');
seedEmployers();

// Routes (to be added)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/host-requests', require('./routes/hostRequestRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

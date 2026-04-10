const express = require('express');
const router = express.Router();
const { registerCandidate, login, mockGoogleAuth, mockOtpAuth } = require('../controllers/authController');

router.post('/register', registerCandidate);
router.post('/login', login);
router.post('/google', mockGoogleAuth);
router.post('/otp', mockOtpAuth);

module.exports = router;

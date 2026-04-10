const express = require('express');
const router = express.Router();
const { registerCandidate, login, mockGoogleAuth, sendPhoneOtp, verifyPhoneOtp, forgotPassword, resetPassword } = require('../controllers/authController');

router.post('/register', registerCandidate);
router.post('/login', login);
router.post('/google', mockGoogleAuth);
router.post('/send-phone-otp', sendPhoneOtp);
router.post('/verify-phone-otp', verifyPhoneOtp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;

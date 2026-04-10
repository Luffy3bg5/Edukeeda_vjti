const express = require('express');
const router = express.Router();
const { createHostRequest, getMyRequests, getAllRequests, updateRequestStatus } = require('../controllers/hostRequestController');
const { protect, employerOnly } = require('../middlewares/authMiddleware');
const { uploadImage } = require('../config/cloudinary');

router.route('/')
  .post(protect, createHostRequest) // Candidate
  .get(protect, employerOnly, getAllRequests); // Admin

router.get('/my-requests', protect, getMyRequests);

router.put('/:id/status', protect, employerOnly, updateRequestStatus);

module.exports = router;

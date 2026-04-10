const express = require('express');
const router = express.Router();
const { getItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const { protect, employerOnly } = require('../middlewares/authMiddleware');
const { uploadImage } = require('../config/cloudinary');

router.route('/')
  .get(getItems)
  .post(protect, employerOnly, uploadImage.single('image'), createItem);

router.route('/:id')
  .get(getItemById)
  .put(protect, employerOnly, updateItem)
  .delete(protect, employerOnly, deleteItem);

module.exports = router;

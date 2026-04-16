const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All cart routes need authentication

router.route('/')
  .get(getCart)
  .post(addToCart);

router.route('/:courseId')
  .delete(removeFromCart);

module.exports = router;
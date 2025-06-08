const express = require('express');
const router = express.Router();
const {
  addToWishlist,
  removeFromWishlist,
  getWishlistByUser
} =  require('../controllers/wishlistcontroller');

router.post('/', addToWishlist);
router.delete('/', removeFromWishlist);
router.get('/:userId', getWishlistByUser);

module.exports = router;

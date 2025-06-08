const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  productId: {
    type: String,
    required: true,
    ref: 'Product'
  }
}, { timestamps: true });

wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

const WishlistModel = mongoose.model('Wishlist', wishlistSchema);
module.exports = WishlistModel;

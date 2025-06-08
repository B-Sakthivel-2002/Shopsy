const WishlistModel = require('../models/wishlist');

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    console.log(userId,productId)
    const item = await WishlistModel.create({ userId, productId });
    res.json({
      success: true,
      message: 'Added to wishlist',
      item
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        success: false,
        message: 'Product already in wishlist'
      });
    }
    res.json({
      success: false,
      message: error.message
    });
  }
};

// Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    await WishlistModel.findOneAndDelete({ userId, productId });
    res.json({
      success: true,
      message: 'Removed from wishlist'
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};

// Get all wishlist items by user ID
exports.getWishlistByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const items = await WishlistModel.find({ userId }).populate('productId');
    res.json({
      success: true,
      wishlist: items
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};

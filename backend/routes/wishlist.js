const express = require('express');
const router = express.Router();
const User = require('../model/User');

// Get user's wishlist
router.get('/wishlist/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('wishlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.wishlist);
  } catch (err) {
    console.error('Error fetching wishlist:', err);
    res.status(500).json({ message: err.message });
  }
});

// Add recipe to wishlist
router.post('/wishlist/:userId/add/:recipeId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const recipeId = req.params.recipeId;
    
    // Check if recipe is already in wishlist
    if (user.wishlist.includes(recipeId)) {
      return res.status(400).json({ message: 'Recipe already in wishlist' });
    }

    user.wishlist.push(recipeId);
    await user.save();

    res.status(200).json({ message: 'Recipe added to wishlist', wishlist: user.wishlist });
  } catch (err) {
    console.error('Error adding to wishlist:', err);
    res.status(500).json({ message: err.message });
  }
});

// Remove recipe from wishlist
router.delete('/wishlist/:userId/remove/:recipeId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const recipeId = req.params.recipeId;
    user.wishlist = user.wishlist.filter(id => id.toString() !== recipeId);
    await user.save();

    res.status(200).json({ message: 'Recipe removed from wishlist', wishlist: user.wishlist });
  } catch (err) {
    console.error('Error removing from wishlist:', err);
    res.status(500).json({ message: err.message });
  }
});

// Check if recipe is in wishlist
router.get('/wishlist/:userId/check/:recipeId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const recipeId = req.params.recipeId;
    const isInWishlist = user.wishlist.includes(recipeId);

    res.status(200).json({ isInWishlist });
  } catch (err) {
    console.error('Error checking wishlist:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;



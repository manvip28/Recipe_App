const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }]
}, {
  timestamps: true // This automatically adds createdAt and updatedAt
});

// No need for pre-save hook since we're using timestamps: true

const User = mongoose.model('User', userSchema);

module.exports = User;
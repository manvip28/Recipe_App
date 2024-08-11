const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  ingredients: { type: [String], required: true },
  procedure: { type: [String], required: true },
});

const Recipe = mongoose.model('recipes', recipeSchema);

module.exports = Recipe;

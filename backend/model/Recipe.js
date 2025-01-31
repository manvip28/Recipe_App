const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  ingredients: { type: [String], required: true },
  procedure: { type: [String], required: true },
});

// Use singular 'Recipe' and let Mongoose handle the collection name
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

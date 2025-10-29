const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  recipeName: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
  cookingTime: { type: Number, required: true },
  prepTime: { type: Number, required: true },
  totalTime: { type: Number, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  servings: { type: Number, required: true },
  category: { type: String, required: true },
  cuisine: { type: String, required: true },
  tags: { type: [String], default: [] },
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  dietaryRestrictions: { type: [String], default: [] },
  equipment: { type: [String], default: [] },
  skillLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  favoriteCount: { type: Number, default: 0 },
  createdBy: { type: String, default: 'system' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

<<<<<<< HEAD
// Use singular 'Recipe' and let Mongoose handle the collection name
const Recipe = mongoose.model('Recipe', recipeSchema);
=======
// Use singular 'Recipe' and specify the exact collection name
const Recipe = mongoose.model('Recipe', recipeSchema, 'recipes');
>>>>>>> b29da0c (Final Version)

module.exports = Recipe;

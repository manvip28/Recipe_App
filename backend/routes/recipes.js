const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Route to get all recipes
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new recipe
router.post('/recipes', async (req, res) => {
  const { name, description, ingredients, procedure } = req.body;
  const newRecipe = new Recipe({
    name,
    description,
    ingredients,
    procedure
  });

  try {
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Other routes for updating, deleting, etc. can be added similarly

module.exports = router;

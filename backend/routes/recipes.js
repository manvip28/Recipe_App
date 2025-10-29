const express = require('express');
const router = express.Router();
const Recipe = require('../model/Recipe');

// Route to get all recipes (with Redis caching)
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    console.error('❌ Error fetching recipes:', err);
    res.status(500).json({ message: err.message });
  }
});

<<<<<<< HEAD
// Route to get a specific recipe by ID with Redis caching
router.get('/recipe/:id', async (req, res) => {
  const redisClient = req.redis;
  const recipeId = req.params.id;

  try {
    // Check Redis cache first
    const cachedRecipe = await redisClient.get(`recipe_${recipeId}`);
    if (cachedRecipe) {
      console.log('📦 Single recipe cache hit');
      return res.status(200).json(JSON.parse(cachedRecipe));
    }

    // If not in cache, fetch from DB
    const recipe = await Recipe.findById(recipeId);
=======
// Route to get a specific recipe by ID
router.get('/recipes/:id', async (req, res) => {
  const recipeId = req.params.id;

  try {
    const recipe = await Recipe.findById(recipeId);
    
>>>>>>> b29da0c (Final Version)
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

<<<<<<< HEAD
    // Cache the result with a TTL (e.g., 1 hour = 3600 seconds)
    await redisClient.setEx(`recipe_${recipeId}`, 3600, JSON.stringify(recipe));
    console.log('❌ Single recipe cache miss - fetched from DB');

    res.status(200).json(recipe);
  } catch (err) {
=======
    res.status(200).json(recipe);
  } catch (err) {
    console.error('❌ Error fetching recipe:', err);
>>>>>>> b29da0c (Final Version)
    res.status(500).json({ message: err.message });
  }
});


// Route to create a new recipe (and clear Redis cache)
router.post('/recipes', async (req, res) => {
  const redisClient = req.redis;
  const { name, description, ingredients, procedure } = req.body;

  const newRecipe = new Recipe({
    name,
    description,
    ingredients,
    procedure
  });

  try {
    const savedRecipe = await newRecipe.save();

    // Invalidate the cache since data has changed
    await redisClient.del('all_recipes');

    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// You can also add update/delete later with similar cache invalidation

module.exports = router;

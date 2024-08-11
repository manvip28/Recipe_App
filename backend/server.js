const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const Recipe = require('./model/Recipe'); // Adjust path as per your project structure
const authRoutes = require('./routes/auth'); // Import the auth routes

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from 'uploads' directory

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/recipes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
  process.exit(1); // Exit process on connection failure
});

// Use auth routes
app.use('/api/auth', authRoutes);

// Define other routes
app.post('/api/recipes', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).send(recipe);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get('/api/recipe/:id', async (req, res) => {
  try {
      const recipe = await Recipe.findById(req.params.id);
      res.json(recipe);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});
app.listen(PORT, () => {
  console.log(`Recipe server running on port ${PORT}`);
});

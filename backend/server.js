require('dotenv').config();  // Load environment variables from .env

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const { createClient } = require('redis');

const Recipe = require('./model/Recipe') // Import Recipe model
const authRoutes = require('./routes/auth'); // Import the auth routes



const app = express();
const PORT = process.env.PORT || 3001;  // Use environment port, default to 3001

const MONGO_URI = process.env.MONGO_URI;  // MongoDB URI from .env file

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.error('❌ Redis Error:', err));
redisClient.on('connect', () => console.log('✅ Connected to Redis Cloud'));

redisClient.connect();

app.use(cors());

// Make Redis available to routes
app.use((req, res, next) => {
  req.redis = redisClient;
  next();
});

const recipeRoutes = require('./routes/recipes');
app.use('/api', recipeRoutes); // This will make /api/recipes go through your router

// Middleware
  // Enables Cross-Origin Resource Sharing (CORS)
app.use(express.json());  // Parse incoming JSON request bodies (modern)
app.use(bodyParser.json());  // Parse incoming JSON (optional if using express.json)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
  process.exit(1);  // Exit process on connection failure
});

// Routes
app.use('/api/auth', authRoutes);  // Use auth routes under '/api/auth'

// Recipe routes
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

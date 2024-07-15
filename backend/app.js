const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3001;

app.use(cors()); // Enables Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json()); // Parses incoming JSON payloads

app.use('/api', authRoutes); // Mounts authRoutes under '/api' endpoint

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


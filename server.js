
require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./logger'); 
const app = express();

const apiRequestLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS),
  message: "Number of requests exceeded, try again later",
});

// middleware API requests
app.use((req, res, next) => {
  // Log the request method, URL, and timestamp
  logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(apiRequestLimiter);
app.use(bodyParser.json());
app.use(cors());
const employeeRoutes = require('./routes/employeeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api', employeeRoutes);
app.use('/api', dashboardRoutes);

// middleware API responses
app.use((req, res, next) => {
  //response status code+and timestamp
  logger.info(`[${new Date().toISOString()}] Response Status: ${res.statusCode}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'DocumentNotFoundError') {
    // Handle document not found error (HTTP 404)
    res.status(404).json({ error: 'Document not found' });
  } else if (err.name === 'UnauthorizedError') {
    // Handle unauthorized access error (HTTP 401)
    res.status(401).json({ error: 'Unauthorized access' });
  } else if (err.name === 'ValidationError') {
    // Handle validation error (HTTP 400)
    res.status(400).json({ error: 'Validation error', details: err.details });
  } else {
    // Handle other errors as internal server errors (HTTP 500)
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.SERVER_PORT
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});


const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const blogRouter = require('./controllers/blog');

mongoose.connect(config.MONGODB_URI)
  .then(_ => logger.info('connected to Mongo DB suscessfully'))
  .catch(error => logger.error(`error connecting to MongoDB ${error.message}`));

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);
app.use('/api/blogs', blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
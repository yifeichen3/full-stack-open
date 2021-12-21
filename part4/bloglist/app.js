const blogRouter = require('./controllers/blog')
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URL)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app

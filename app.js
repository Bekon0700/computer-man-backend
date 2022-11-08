const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const serviceRouter = require('./routes/serviceRoute')
const reviewRouter = require('./routes/reviewRoute')

const app = express()

app.use(cors())

app.use(express.json({ limit: '10kb' }))
app.use(morgan('dev'))


app.use('/api/v1/services', serviceRouter);
app.use('/api/v1/reviews', reviewRouter);


module.exports = app
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const serviceRouter = require('./routes/serviceRoute')

const app = express()

app.use(cors())

app.use(express.json({ limit: '10kb' }))
app.use(morgan('dev'))


app.use('/api/v1/services', serviceRouter);


module.exports = app
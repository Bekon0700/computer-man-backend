const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const serviceRouter = require('./routes/serviceRoute')
const reviewRouter = require('./routes/reviewRoute')

const cookieParser = require('cookie-parser')

const app = express()



app.use(cors())

app.use(cookieParser())

app.use(express.json({ limit: '10kb' }))
app.use(morgan('dev'))


app.get('/', (req, res) => {
    res.send('Server is running, ok &#128528')
})

app.use('/api/v1/services', serviceRouter);
app.use('/api/v1/reviews', reviewRouter);


module.exports = app
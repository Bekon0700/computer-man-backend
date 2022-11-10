const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require('mongoose');

dotenv.config({
    path: './config.env'
})

global.__basedir = __dirname;

console.log(__basedir)

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(con => {
        console.log('DB connection successful')
    }).catch(err => {
        console.error(`${err.message}`)
    })


const port = process.env.PORT || 9500

const server = app.listen(port, () => {
    console.log('App is running on port ' + port)
})
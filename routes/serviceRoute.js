const express = require('express')
const { allServices, addService, deleteService, updateService } = require('../controllers/serviceController')

const router = express.Router()

router.route('/')
    .get(allServices)
    .post(addService)

module.exports = router
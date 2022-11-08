const express = require('express')
const { allServices, addService, deleteService, updateService, oneService } = require('../controllers/serviceController')

const router = express.Router()

router.route('/')
    .post(addService)

router.route('/:serviceId')
    .patch(updateService)
    .delete(deleteService)

module.exports = router
const express = require('express')
const { allServices, addService, deleteService, updateService } = require('../controllers/serviceController')

const router = express.Router()

router.route('/')
    .get(allServices)
    .post(addService)

router.route('/:slugId')
    .patch(updateService)
    .delete(deleteService)

module.exports = router
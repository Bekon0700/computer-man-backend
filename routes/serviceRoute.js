const express = require('express')
const { allServices, addService, deleteService, updateService, oneService, insertImg, uploadImg } = require('../controllers/serviceController')

const router = express.Router()

router.route('/')
    .get(allServices)
    .post(addService)

router.route('/img-upload/:id')
    .post(uploadImg, insertImg)

router.route('/:serviceId')
    .get(oneService)
    .patch(updateService)
    .delete(deleteService)

module.exports = router
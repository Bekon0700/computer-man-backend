const catchAsync = require('./../utils/catchAsync')
const Service = require('./../models/serviceModel')

exports.allServices = catchAsync(async (req, res, next) => {
    const services = await Service.find()

    res.status(200).json({
        status: 'success',
        length: services.length,
        services
    })
})

exports.addService = catchAsync(async (req, res, next) => {
    const serviceData = req.body
    const service = await Service.create(serviceData)

    res.status(200).json({
        status: 'success',
        service
    })
})

exports.updateService = catchAsync(async (req, res, next) => {

})

exports.deleteService = catchAsync(async (req, res, next) => {

})
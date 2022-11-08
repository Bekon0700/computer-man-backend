const catchAsync = require('./../utils/catchAsync')
const AppError = require("../utils/appError");
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

    res.status(201).json({
        status: 'success',
        service
    })
})

exports.updateService = catchAsync(async (req, res, next) => {
    const slugId = req.params.slugId
    const updateServiceData = req.body
    const service = await Service.updateOne({ slug: slugId }, updateServiceData)

    if (service.matchedCount == 0) {
        return next(
            new AppError('This is not a valid service to fix', 204)
        );
    }

    res.status(200).json({
        status: 'success',
        service
    })
})

exports.deleteService = catchAsync(async (req, res, next) => {
    const slugId = req.params.slugId
    const service = await Service.deleteOne({ slug: slugId })

    res.status(200).json({
        status: 'success',
    })
})
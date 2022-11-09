const catchAsync = require('./../utils/catchAsync')
const AppError = require("../utils/appError");
const APIFeature = require("../utils/apiFeatures");
const Service = require('./../models/serviceModel')

exports.allServices = catchAsync(async (req, res, next) => {
    const query = Service.find()
    const features = new APIFeature(query, req.query).filter().sort().fieldLimit().pagination()
    const services = await features.query

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
    const serviceId = req.params.serviceId
    const updateServiceData = req.body
    const service = await Service.findByIdAndUpdate({ _id: serviceId }, updateServiceData)

    res.status(200).json({
        status: 'success',
    })
})

exports.deleteService = catchAsync(async (req, res, next) => {
    const serviceId = req.params.serviceId
    const service = await Service.findByIdAndDelete(serviceId)

    res.status(200).json({
        status: 'success',
    })
})

exports.oneService = catchAsync(async (req, res, next) => {
    const serviceId = req.params.serviceId
    console.log(serviceId)
    const service = await Service.findById(serviceId).populate('reviews')

    res.status(200).json({
        status: 'success',
        service
    })
})
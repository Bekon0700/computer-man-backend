const catchAsync = require('./../utils/catchAsync')
const AppError = require("../utils/appError");
const APIFeature = require("../utils/apiFeatures");
const Service = require('./../models/serviceModel')
const fs = require('fs')
const path = require('path')
const multer = require('multer')

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
    const service = await Service.findById(serviceId).populate('reviews')

    res.status(200).json({
        status: 'success',
        service
    })
})

// IMAGE UPLOAD SECTION

const multrConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload-img/')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`)
    }
});

const isImg = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('only image file allowed', 417))
    }
}

const upload = multer({
    storage: multrConfig,
    fileFilter: isImg
})

exports.uploadImg = upload.single('image')

exports.insertImg = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const imgData = req.file

    const service = await Service.updateOne(
        { _id: id },
        {
            img: {
                data: fs.readFileSync(path.join(__basedir + '/upload-img/' + imgData.filename)),
                content: imgData.mimetype
            }
        }
    )

    res.status(200).json({
        status: 'success',
        service
    })
})



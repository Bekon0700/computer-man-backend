const catchAsync = require('./../utils/catchAsync')
const AppError = require("../utils/appError");
const Review = require('./../models/reviewModel')


exports.addReview = catchAsync(async (req, res, next) => {
    const reviewData = req.body
    const review = await Review.create(reviewData)

    res.status(201).json({
        status: 'success',
        review
    })
})

exports.updateReview = catchAsync(async (req, res, next) => {
    const reviewId = req.params.reviewId
    const updateReviewData = req.body
    const review = await Review.findOneAndUpdate({ _id: reviewId }, updateReviewData)

    res.status(200).json({
        status: 'success',
    })
})

exports.deleteReview = catchAsync(async (req, res, next) => {
    const reviewId = req.params.reviewId
    const review = await Review.findOneAndDelete({ _id: reviewId })

    res.status(200).json({
        status: 'success',
    })
})

// exports.specificUserReview = catchAsync(async (req, res, next) => {
//     const slugId = req.params.reviewId
//     const service = await Service.findOne({ slug: slugId })

//     res.status(200).json({
//         status: 'success',
//         service
//     })
// })
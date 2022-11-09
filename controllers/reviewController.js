const catchAsync = require('./../utils/catchAsync')
const AppError = require("../utils/appError");
const Review = require('./../models/reviewModel')
const jwt = require('jsonwebtoken');

const signToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};


exports.createToken = (req, res) => {
    const token = signToken(req.body.email);

    const cookieOptions = {
        httpOnly: true,
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
    };

    if (process.env.NODE_ENV === 'production') cookieOptions[secure] = true;

    res.cookie('jwt', token, cookieOptions);

    res.status(201).json({
        status: 'success',
        token,
    });
};


exports.checkAuth = (req, res, next) => {
    const header = req.headers.authorization?.split(' ')[1]
    if (!header) {
        return next(new AppError('Unauthorized user', 401))
    }
    jwt.verify(header, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new AppError('Unauthorized user', 401))
        } else {
            req.user = {
                email: decoded.email
            }
            next()
        }
    })
}



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
    const review = await Review.findByIdAndUpdate({ _id: reviewId }, updateReviewData)

    res.status(200).json({
        status: 'success',
    })
})

exports.deleteUserReview = catchAsync(async (req, res, next) => {
    const reviewId = req.params.reviewId
    const review = await Review.findByIdAndDelete(reviewId)

    res.status(200).json({
        status: 'success',
    })
})

exports.specificUserReview = catchAsync(async (req, res, next) => {
    const email = req.params.email

    if (req.user.email !== email) {
        return next(new AppError('Unauthorized Access', 403))
    }

    const reviews = await Review.find({ email })

    res.status(200).json({
        status: 'success',
        reviews: reviews
    })
})
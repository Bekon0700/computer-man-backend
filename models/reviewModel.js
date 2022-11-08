const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        review: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
        },
        serviceName: {
            type: String,
            default: 'computer-man'
        },
        service: {
            type: mongoose.Schema.ObjectId,
            ref: 'Service',
            required: [true, 'A review must belong to a service'],
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
const express = require('express')
const { specificUserReview, deleteUserReview, updateReview, addReview } = require('../controllers/reviewController')

const router = express.Router()

router.route('/')
    .get(specificUserReview)
    .post(addReview);

router.route('/:reviewId')
    .patch(updateReview)
    .delete(deleteUserReview)

router.route('/:email')
    .get(specificUserReview)

module.exports = router
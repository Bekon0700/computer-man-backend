const express = require('express')
const { specificUserReview, deleteReview, updateReview, addReview } = require('../controllers/reviewController')

const router = express.Router()

router.route('/')
    .post(addReview)

// .get(specificUserReview)
router.route('/:reviewId')
    .patch(updateReview)
    .delete(deleteReview)

module.exports = router
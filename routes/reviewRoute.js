const express = require('express')
const { specificUserReview, deleteUserReview, updateReview, addReview, createToken, checkAuth } = require('../controllers/reviewController')

const router = express.Router()

router.route('/')
    .post(addReview);

router.route('/createToken')
    .post(createToken);

router.route('/:reviewId')
    .patch(updateReview)
    .delete(deleteUserReview)

router.route('/:email')
    .get(checkAuth, specificUserReview)

module.exports = router
const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const reviewModel = require("../models/reviewModel");

router.get("/reviews", reviewController.getAllreviews);
//http://localhost:3001/api/reviews?id=2
router.get("/reviewsyear", reviewController.getAllreviewsyear);
// //http://localhost:3001/api/reviewsyear?id=23
// router.get("/reviewsrating", reviewController.getAllreviewsrating);
// http://localhost:3001/api/reviewsrating
router.get("/reviewsbyyear", reviewController.getreviewsbyyear);
// http://localhost:3001/api/reviewsbyyear?id=27&year=2023
router.get('/reviewsrating', reviewController.getReviewsByRatingRange);
    //http://localhost:3001/api/reviewsrating?id=35&rating=6

module.exports = router;
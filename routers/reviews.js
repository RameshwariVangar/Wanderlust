const express = require("express");
const router = express.Router({mergeParams:true});
const wrapasync = require("../utils/wrapasync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validateReview ,isLoggedIn,isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/review.js")
//Post route
router.post("/",
    isLoggedIn,
    validateReview,
    wrapasync(reviewController.createReview));

   //Delete review route
   router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapasync(reviewController.destoryReview));

   module.exports = router ;
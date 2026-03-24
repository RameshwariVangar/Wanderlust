const express =  require("express");
const router =  express.Router();
const wrapasync = require("../utils/wrapasync.js");
// const {listingSchema , reviewSchema} = require("../schema.js");
// const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn,isOwner,validatelisting } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require('multer');
const {storage} = require("../cloudconfig.js");
const ulpoad = multer({storage});
router
     .route("/")
     .get( wrapasync (listingController.indexRoute)) //index  route
        .post(
          isLoggedIn,  
          ulpoad.single('listing[image]'),
          validatelisting ,
          wrapasync (listingController.createListing)
        );//create route
    

 //New route
router.get("/new",isLoggedIn,listingController.newRender);      

router
     .route("/:id")
     .get(wrapasync (listingController.showListing))//Read : Show route
     .put(
        isLoggedIn,
        isOwner,
        ulpoad.single('listing[image]'),
        validatelisting,
        wrapasync(listingController.updateListing)
       ) //update route
     .delete(isLoggedIn,isOwner,
        wrapasync (listingController.destoryListing)
        ); ///delete route



//edit route
router.get("/:id/edit",
          isLoggedIn,
          isOwner,
          wrapasync ( listingController.editListing)
        );

module.exports = router ;
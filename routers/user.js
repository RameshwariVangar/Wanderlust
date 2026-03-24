const express = require("express");
const router = express.Router();
const User =  require("../models/user.js");
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userControllers = require("../controllers/user.js");



router
      .route("/signup")
      .get(userControllers.signUpRender)
      .post(wrapasync(userControllers.signUpRouter));


router
     .route("/login")
     .get(userControllers.loginRender)
    .post(
        saveRedirectUrl,
        passport.authenticate("local",{ 
        failureRedirect:"/login",
        failureFlash:true,
        }),
        userControllers.loginRouter
    );


//passport.authenticate middleware:  check user available or not/is wrong password enter?

 router.get("/logout",userControllers.logoutRouter);
module.exports = router ;
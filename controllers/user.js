
const User =  require("../models/user");

module.exports.signUpRender =  (req,res)=>{
  res.render("users/signup.ejs");
}

module.exports.signUpRouter = async(req,res)=>{
    try{
        let {username,email,password} = req.body ;
        const newUser = new User({email,username});
        const registerUser = await User.register(newUser , password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings");
        });
        
         
    } catch(err){
           req.flash("error",err.message);
           res.redirect("/signup");
    }
   
}

module.exports.loginRender = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.loginRouter =  async(req,res)=>{
           req.flash("success" , "Login Successfully !");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
   }

module.exports.logoutRouter = (req,res)=>{
     req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are log out!");
        res.redirect("/listings");
     });
 }
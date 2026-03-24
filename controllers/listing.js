const Listing = require("../models/listing");

module.exports.indexRoute = async (req,res)=>{
    let allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
};

module.exports.newRender = (req,res)=>{
    console.log(req.user);
    res.render("listings/new.ejs");
}

module.exports.createListing = async(req,res,next)=>{
   // let {title,description,image,price,country,location}=req.body;
    //console.log(req.body.listing);
   
   
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url,"..",filename);
    const newListing = new Listing(req.body.listing);
        // console.log(req.user);
        newListing.owner = req.user._id;
        newListing.image = {url,filename};
        await newListing.save();
        req.flash("success","New Listing Created");
        res.redirect("/listings");
}

module.exports.showListing = async(req,res)=>{
    let {id} =  req.params ;
   const listing =  await Listing.findById(id)
   .populate({path:"reviews",
    populate:{
        path:"author",
       },
     })
   .populate("owner");
   if(!listing){
    req.flash("error","Listing you requested for does not exist");
   res.redirect("/listings");
   }   
   console.log(listing);
   res.render("listings/show.ejs",{listing});
}

module.exports.editListing = async (req,res)=>{
   let {id} =  req.params ;
   const listing =  await Listing.findById(id);
  if(!listing){
    req.flash("error","Listing you requested for does not exsit");
    res.redirect("/listings");
  }
   let originalImgUrl = listing.image.url;
   originalImgUrl = originalImgUrl.replace("/upload","/upload/w_250");
   res.render("listings/edit.ejs",{listing,originalImgUrl});
}

module.exports.updateListing = async(req,res)=>{
   
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send valid data for listing");
    // }
     let {id} =  req.params ;
   let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save(); 
    }
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.destoryListing = async(req,res)=>{
     let {id} =  req.params ;
     let deleteListing =  await Listing.findByIdAndDelete(id);
     console.log(deleteListing);
     req.flash("success","Listing is deleted");
     res.redirect(`/listings`);
}
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    //username and password automatically define by passport
});

//username/hashing/salting/password automatic created by:
userSchema.plugin(passportLocalMongoose);
  
module.exports = mongoose.model("User",userSchema);
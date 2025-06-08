const mongoose= require('mongoose');
const { v4: uuidv4 } = require('uuid');
const userSchema=new mongoose.Schema({
    userId: { type: String, default: uuidv4 },
    username:String,
    email:String,
    password:String,
    confirmpassword:String,
    MobileNo:String
});
const userModel= mongoose.model('User',userSchema);
module.exports = userModel ;
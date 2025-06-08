const mongoose= require('mongoose');
const { v4: uuidv4 } = require('uuid');
const addressSchema=new mongoose.Schema({
    addressId: { type: String, default: uuidv4 },
    userId:String,
    name:String,
    mobileNo:String,
    pinCode:String,
    locality:String,
    address:String,
    city:String,
    state:String,
    addressType:String
});
const addressModel= mongoose.model('Address',addressSchema);
module.exports = addressModel ;
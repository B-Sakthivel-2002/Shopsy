const mongoose= require('mongoose');
const orderSchema=new mongoose.Schema({
    cartItems:Array,
    amount:String,
    status:String,
    createdAt: {
        type: Date,
        default: Date.now 
    },
    userId:String,
    addressId:String,
    paymentMode:String
});
const orderModel= mongoose.model('Order',orderSchema);
module.exports = orderModel ;
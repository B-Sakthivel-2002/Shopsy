const OrderModel = require('../models/orderModel')
const productModel = require('../models/productModel');
exports.createOrder =async (req,res,next)=>{
    const cartItems=req.body.cartItems;
    console.log(req.body);
    const amount=Number(cartItems.reduce((acc,item)=>(acc + item.product.price*item.qty),0)).toFixed(2);
    const status="Pending";
    const userId=req.body.userData;
    const addressId=req.body.addressId;
    const paymentMode=req.body.paymentMode;
    const order = await OrderModel.create({cartItems,amount,status,userId,addressId,paymentMode})
   
    // OrderModel.create();
    // Updating product stock
    cartItems.forEach(async (item)=> {
        const product = await productModel.findById(item.product._id);
        product.stock = product.stock - item.qty;
        await product.save();
    });

    res.json({
        success:true,
        order
    })
};
exports.getOrdersByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId; 

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }
        const orders = await OrderModel.find({ userId }).populate("cartItems.product").sort({ _id: -1 });; 

        if (!orders.length) {
            return res.status(404).json({ success: false, message: "No orders found for this user" });
        }

        res.json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.deleteOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;

        if (!orderId) {
            return res.status(400).json({ success: false, message: "Order ID is required" });
        }

        const order = await OrderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        for (const item of order.cartItems) {
            const product = await productModel.findById(item.product._id);
            if (product) {
                product.stock += item.qty;
                await product.save();
            }
        }

        await OrderModel.findByIdAndDelete(orderId);

        res.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

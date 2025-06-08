const express=require('express');
const { createOrder , getOrdersByUserId , deleteOrder} = require('../controllers//ordercontroller');
const router=express.Router();
router.route('/order').post(createOrder);
router.route('/orders/:userId').get(getOrdersByUserId);
router.route('/cancelorder/:orderId').delete(deleteOrder);
module.exports=router;
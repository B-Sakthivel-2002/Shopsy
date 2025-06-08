const express=require('express');
const { getProducts, getProductbyId } = require('../controllers/productcontroller');
const router=express.Router();
router.route('/products').get(getProducts);
router.route('/product/:id').get(getProductbyId);
module.exports=router;
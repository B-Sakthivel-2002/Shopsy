const express=require('express');
const { register,update,login } = require('../controllers/authcontroller');
const { insertAddress ,getAddressByUserId , deleteAddress} = require('../controllers/addresscontroller')
const router=express.Router();
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/update').put(update);
router.route('/insertAdd').post(insertAddress);
router.route('/getAddress/:userId').get(getAddressByUserId);
router.route('/deleteAddress/:addressId').delete(deleteAddress);
module.exports=router;
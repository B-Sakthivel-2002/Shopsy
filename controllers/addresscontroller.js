const addressModel = require('../models/addressModel');
const AddressModel = require('../models/addressModel')
exports.insertAddress =async (req,res,next)=>{
    const newaddress=req.body;
    const Address = await AddressModel.create(newaddress)
    res.json({
        success:true,
        Address: Address 
    })
}
exports.deleteAddress = async (req, res, next) => {
    try {
        const addressId = req.params.addressId;

        if (!addressId) {
            return res.status(400).json({ success: false, message: "Address ID is required" });
        }

        const address = await AddressModel.findById(addressId);
        if (!address) {
            return res.status(404).json({ success: false, message: "Address not found" });
        }


        await addressModel.findByIdAndDelete(addressId);

        res.json({ success: true, message: "Address deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getAddressByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId; 

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }
        const address = await AddressModel.find({ userId }); 

        if (!address.length) {
            return res.status(404).json({ success: false, message: "No Address found for this user" });
        }

        res.json({
            success: true,
            address,
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
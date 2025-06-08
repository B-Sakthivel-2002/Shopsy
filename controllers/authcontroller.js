const UserModel = require('../models/userModel')
exports.register =async (req,res,next)=>{
    const newuser=req.body;
    const User = await UserModel.create(newuser)
    res.json({
        success:true,
        user: User 
    })
}
exports.update = async (req, res, next) => {
  try {
    const { _id } = req.body; // Correctly extract _id from req.body
    const updatedUserData = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      _id, // Use _id to find the user
      updatedUserData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

     res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error.message,
    });
    next(error);
  }
};
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: email });
      
      if(user!=null){
        const isPasswordMatch = password===user.password?true:false; // Assuming comparePassword method exists in UserModel
        if (isPasswordMatch==false) {
            return res.status(401).json({
              success: false,
              message: 'Invalid credentials',
            });
          }
      
           res.json({
            success: true,
            user,
            message: 'Login successful',
          });
      }
      else{
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials',
          });
      }
      
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Login Failed',
      });
    }
  };
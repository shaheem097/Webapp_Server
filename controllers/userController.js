const User = require('../Models/usermodel');
const generateToken=require('../Utils/generateToken')
const asyncHandler = require('express-async-handler');


module.exports = {
  
  registerUser : asyncHandler(async (req, res) => {
    console.log('REACHED');
    console.log(req.body);
  
    const { name, email, password, pic } = req.body;
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User Already Exists');
    }
  
    const user = await User.create({
      name,
      email,
      password,
      pic,
    });
  
    if (user) {
      console.log('User Created Successfully');
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token:generateToken(user._id)
      });
    } else {
      res.status(400);
      throw new Error('Error Occurred');
    }
  }),

  PostloginUser:asyncHandler(async(req,res)=>{
   console.log("etheee");
    const { name, email, password, pic } = req.body;

   const user=await User.findOne({email});
   console.log(user._id);

   if(user&&(await user.matchPassword(password))){
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token:generateToken(user._id)
    })
   }
   else {
    res.status(400);
    throw new Error('INVALID email or password');
  }

  }),

   updateUserProfile: asyncHandler(async (req, res) => {
    const userId = req.user._id; // Assuming the user ID is stored in req.user._id
    console.log(userId);
  
    const user = await User.findById(userId);
    console.log(user);
    console.log(req.body.name);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { name: user.name, email: user.email } },
        { new: true } // To return the updated document
      );
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        pic:updatedUser.pic,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  }),
  

  getProfileData :async(req, res) => {
    try {
        console.log(req.body)
        const user = await User.findById(req.body.user._id)
        res.json({ success: true, data: user })
    } catch (error) {
        res.json({ success: false, message: "Data fetching error" })
    }
}


}




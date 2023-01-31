const User = require('../models/userModel');

exports.register = async (req, res) => {
  try {
   
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json({
      success: true,
      user
    });
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    
    try {
      if (!username || !password){
        return res.status(400).json({
          message: "Please enter both email and password",
        })
      }
      let user = await User.findOne({username: username})
      
      
      if (!user){
        return res.status(400).json({
          message: "Invalid email or password",
        })      }
      if (user.password===password){
        return res.status(200).json({
          message: "succesfully login ",
          user
        })
      }
      else{
        return res.status(400).json({
          message: "Invalid email or password"
        }
        );
      }
      
    }
    catch (error) {
      res.status(400).json(
        error
      );    
    }
}


exports.forgetPassword = async (req,res) => {
  const { email, newPassword } = req.body
    
    try {
      if (!email || !newPassword){
        return res.status(400).json({
          message: "Please enter both email and new password",
        })
      }
      let user = await User.findOne({email: email})
      if (!user){
        return res.status(400).json({
          message: "Invalid email",
        })      }
      else{
        user.password = newPassword;
        await user.save();
        return res.status(200).json({
          message: "Password updated successfully"
        }
        );
      }
      
    }
    catch (error) {
      res.status(400).json(
        error
      );    
    }
}
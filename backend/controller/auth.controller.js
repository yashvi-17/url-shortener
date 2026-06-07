const wrapAsync =require("../utils/trycatchWrapper.js");
const {cookieOptions} = require("../config/config.js");
const {registerUser,loginUser} =require("../services/auth.service.js");

const register = wrapAsync( async (req,res) => {
    const {name,email,password} = req.body;
    const token =  await registerUser(name,email,password);
    res.cookie("accessToken",token,cookieOptions);
    res.status(200).json({
        message: "Login Success",
        token
    });
})

const login = wrapAsync( async (req,res) => {
    const {email,password} = req.body;
    const token = await loginUser(email,password);
    res.cookie("accessToken",token,cookieOptions);
    res.status(200).json({
        message: "Login Success",
        token
    });
})

module.exports = {register,login};
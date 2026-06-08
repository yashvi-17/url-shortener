const wrapAsync =require("../utils/trycatchWrapper.js");
const {cookieOptions} = require("../config/config.js");
const {registerUser,loginUser} =require("../services/auth.service.js");

const register = wrapAsync( async (req,res) => {
    const {name,email,password} = req.body;
    const token =  await registerUser(name,email,password);
    req.user=user;
    res.cookie("accessToken",token,cookieOptions);
    res.status(200).json({
        message: "Login Success",
        token
    });
})

const login = wrapAsync( async (req,res) => {
    const {email,password} = req.body;
    const {token,user} = await loginUser(email,password);
    req.user=user;
    res.cookie("accessToken",token,cookieOptions);
    res.status(200).json({
        message: "Login Success",
        token
    });
})

module.exports = {register,login};
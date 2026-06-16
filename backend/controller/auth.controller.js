const wrapAsync =require("../utils/trycatchWrapper.js");
const {cookieOptions} = require("../config/config.js");
const {registerUser,loginUser} =require("../services/auth.service.js");

const register = wrapAsync( async (req,res) => {
    const {name,email,password} = req.body;
    const {token,user} =  await registerUser(name,email,password);
    req.user=user;
    res.cookie("accessToken",token,cookieOptions);
    res.status(200).json({
        message: "Register Success",
        token
    });
})

const login = wrapAsync( async (req,res) => {
    console.log("LOGIN REQ BODY:", req.body)
    const {email,password} = req.body;
    const {token,user} = await loginUser(email,password);
    req.user=user;
    res.cookie("accessToken",token,cookieOptions);
    res.status(200).json({
        message: "Login Success",
        user: user,
        token
    });
})

const logout = wrapAsync(async (req,res) => {
    res.clearCookie("accessToken",cookieOptions);
    res.status(200).json({message:"logout success"});
});

const get_current_user = wrapAsync( async (req,res) => {
    res.status(200).json({user:req.user});
})

module.exports = {register,login,logout,get_current_user};
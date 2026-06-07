const User =require("../models/user.model.js");
const jsonwebtoken =require("jsonwebtoken");
const {createUser, findUserByEmail} = require("../dao/user.dao.js");
const {ConflictError} = require("../utils/errorHandler.js");
const {signToken} = require("../utils/jwt.js");

const registerUser = async (name,email,password) => {
    const user = await findUserByEmail(email);
    if (user) throw new ConflictError("user already exists");

    const newUser = await createUser(name,email,password);
    const token = await signToken({id:newUser._id});
    return token;
}

 const loginUser = async (email,password) => {
    const user=await findUserByEmail(email);
    if(!user || user.password!==password) throw new Error("Invalid Credentials!"); //we want to secure the info of which emails exist and which do not by not throwing 2 different errors for wrong email and password
    const token = signToken({id: user._id});
    return token;
}

 module.exports = {registerUser,loginUser};
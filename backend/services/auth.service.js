const User =require("../models/user.model.js");
const jsonwebtoken =require("jsonwebtoken");
const {createUser, findUserByEmail, findUserByEmailWithPassword} = require("../dao/user.dao.js");
const {ConflictError} = require("../utils/errorHandler.js");
const {signToken} = require("../utils/jwt.js");
const { default: mongoose } = require("mongoose");

const registerUser = async (name,email,password) => {
    const user = await findUserByEmail(email);
    console.log("Checking email:", email);
    console.log("Existing user found:", user);
    if (user) throw new ConflictError("user already exists");
    const newUser = await createUser(name,email,password);
    const token = await signToken({id:newUser._id});
    const safeUser = newUser.toObject();
    delete safeUser.password;

    return { token, user: safeUser };
}

const loginUser = async (email,password) => {
    const user=await findUserByEmailWithPassword(email);
    if(!user) throw new Error("Invalid Credentials!"); //we want to secure the info of which emails exist and which do not by not throwing 2 different errors for wrong email and password
    
    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid) throw new Error("Invalid Credentials!")
    
    const token = await signToken({id: user._id});
    
    const safeUser = user.toObject();
    delete safeUser.password;

    return {token,user:safeUser};
}

 module.exports = {registerUser,loginUser};
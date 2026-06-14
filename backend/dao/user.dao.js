const User = require("../models/user.model.js");
const URL = require("../models/shorturl.model.js");

const findUserByEmail = async (email) => {
    return await User.findOne({email});
}

const findUserById = async (id) => {
    return await User.findById(id);
}

const findUserByEmailWithPassword = async (email) => {
    return await User.findOne({email}).select("+password");
}

const createUser = async (name, email,password) => {
    const newUser = new User({name,email,password});
    await newUser.save();
    return newUser;
}

const getAllUserUrlsDao = async (id) => {
    return await URL.find({user:id});
}

module.exports = {findUserByEmail,findUserById,createUser, getAllUserUrlsDao,findUserByEmailWithPassword};
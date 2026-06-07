const {cookieOptions} = require("../config/config.js");
const jsonwebtoken = require("jsonwebtoken");
const {loginUser} = require("../services/auth.service.js")

const signToken = (payload, secret, exppiressIn) => {
    return jsonwebtoken.sign(payload,process.env.JWT_SECRET,{expiresIn:"5min"});
}

const verifyToken = (token) => {
    return jsonwebtoken.verify(token,process.env.JWT_SECRET);
}

module.exports = {signToken,verifyToken};
const {cookieOptions} = require("../config/config.js");
const jsonwebtoken = require("jsonwebtoken");
const {loginUser} = require("../services/auth.service.js")

const signToken = (payload, secret, exppiressIn) => {
    return jsonwebtoken.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"});
}

const verifyToken = (token) => {
    const decoded= jsonwebtoken.verify(token,process.env.JWT_SECRET);
    console.log(decoded.id);
    return decoded.id;
}

module.exports = {signToken,verifyToken};
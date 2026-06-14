const {cookieOptions} = require("../config/config.js");
const jsonwebtoken = require("jsonwebtoken");

const signToken = (payload, secret, exppiressIn) => {
    return jsonwebtoken.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"});
}

const verifyToken = (token) => {
    const decoded= jsonwebtoken.verify(token,process.env.JWT_SECRET);

    return decoded;
}

module.exports = {signToken,verifyToken};
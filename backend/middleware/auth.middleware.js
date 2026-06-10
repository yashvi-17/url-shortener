const {verifyToken} = require("../utils/jwt.js")
const {findUserById} = require("../dao/user.dao.js")

const authMiddleware = async (req,res,next) => {
    const token= req.cookies.accessToken;
    if(!token) return res.status(401).json({message:"Unauthorised"});
    try{
        const decoded = verifyToken(token);
        const user = await findUserById(decoded);
        if(!user) return res.status(401).json({message:"Unauthorized"});
        req.user=user;
        next();
    }catch(error){
        return res.status(401).json({message:"Unauthorized"});
    }
}

module.exports = {authMiddleware}
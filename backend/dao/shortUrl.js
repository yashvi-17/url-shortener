const URL =require("../models/shorturl.model.js");
const {ConflictError} = require("../utils/errorhandler.js");
const saveShortUrl  = async (shortUrl,longUrl,userId) =>{
    try{
        const newUrl = new URL({
            full_Url:longUrl,
            short_Url:shortUrl,
        });
        if(userId){
            newUrl.user_id=userId;
        }
        await newUrl.save();
    }catch(err){
        if(err.code==11000){
            throw new ConflictError("Short URL already exists");
        }
        throw new Error(err); 
    }
}
const getShortUrl = async(shortUrl)=>{
    return await URL.findOneAndUpdate({short_Url:shortUrl},{$inc:{clicks:1}},{new: true});
}

module.exports = {saveShortUrl,getShortUrl};
//if we ever want to change mongodb we change it here
//rest code stays intact due to modularity
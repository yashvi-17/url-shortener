const URL =require("../models/shorturl.model.js");
const saveShortUrl  = async (shortUrl,longUrl,userId) =>{
    const newUrl = new URL({
        full_Url:longUrl,
        short_Url:shortUrl,
    });
    if(userId){
        newUrl.user_id=userId;
    }
    newUrl.save();
}
const getShortUrl = async(shortUrl)=>{
    return await URL.findOneAndUpdate({short_Url:shortUrl},{$inc:{clicks:1}});
}

module.exports = {saveShortUrl,getShortUrl};
//if we ever want to change mongodb we change it here
//rest code stays intact due to modularity
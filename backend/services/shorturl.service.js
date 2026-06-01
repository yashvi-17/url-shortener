const URL = require("../models/shorturl.model.js");
const {saveShortUrl} = require("../dao/shortUrl.js");
const {generateNanoId} =require("../utils/helper.js");
const createShortUrlWithoutUser = async(url)=>{
    const shortUrl = await generateNanoId(7);
    if(!shortUrl) throw new Error("short URL not generated");
    await saveShortUrl(shortUrl,url);
    return shortUrl;
}
const createShortUrlWithUser = async(url,userId)=>{
    const shortUrl = await generateNanoId(7);
    await saveShortUrl(shortUrl,url,userId);
    return shortUrl;
}
module.exports = {createShortUrlWithoutUser,createShortUrlWithUser};

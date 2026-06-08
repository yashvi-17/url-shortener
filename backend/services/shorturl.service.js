const URL = require("../models/shorturl.model.js");
const {saveShortUrl} = require("../dao/shortUrl.js");
const {generateNanoId} =require("../utils/helper.js");
const {getCustomUrl} = require("../dao/shortUrl.js");


const createShortUrlWithoutUser = async(url)=>{
    const shortUrl = generateNanoId(7);
    if(!shortUrl) throw new Error("short URL not generated");
    await saveShortUrl(shortUrl,url);
    return shortUrl;
}
const createShortUrlWithUser = async(url,userId,slug=null)=>{
    const shortUrl = slug||generateNanoId(7);
    const exists=await getCustomUrl(slug);
    if(exists) throw new Error("This custom URL already exists");

    await saveShortUrl(shortUrl,url,userId);
    return shortUrl;
}
module.exports = {createShortUrlWithoutUser,createShortUrlWithUser};

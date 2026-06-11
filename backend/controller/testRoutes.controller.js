const urlSchema = require("../models/shorturl.model.js");
const {createShortUrlWithUser,createShortUrlWithoutUser} =require("../services/shorturl.service.js");
const wrapAsync = require("../utils/trycatchWrapper.js"); //now we can use this for all the functions in this file instead of try and catch again and again
const {getShortUrl} = require("../dao/shortUrl.js");

const createShortUrl = wrapAsync(async(req,res,next)=>{
    const data =req.body;
    let shortUrl;
    if(req.user){
        shortUrl = await createShortUrlWithUser(data.url,req.user._id,data.slug);
    }else{
        shortUrl = await createShortUrlWithoutUser(data.url);
    }
    //res.status(403).send("Not Allowed");
    res.status(200).json({shortUrl:`${process.env.APP_URL}/${shortUrl}`});
})

const redirectFromShortUrl = wrapAsync(async (req,res) =>{
    const {id} =req.params;
    const url=await getShortUrl(id);
    if (!url) {
        return res.status(404).json({
            message: "Short URL not found"
        });
    }
    return res.redirect(url.full_Url);
})

const createCustomShortUrl = wrapAsync(async (req,res) =>{
    const {url,slug}=req.body;
    const shortUrl=await createShortUrlWithoutUser(url,slug);
    res.status(200).json({shortUrl: process.env.APP_URL + shortUrl});
})

module.exports = {createShortUrl,redirectFromShortUrl,createCustomShortUrl};
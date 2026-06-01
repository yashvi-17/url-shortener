const urlSchema = require("../models/shorturl.model.js");
const {createShortUrlWithoutUser} =require("../services/shorturl.service.js");
const wrapAsync = require("../utils/trycatchWrapper.js"); //now we can use this for all the functions in this file instead of try and catch again and again
const {getShortUrl} = require("../dao/shortUrl.js");
const createShortUrl = wrapAsync(async(req,res,next)=>{
    const { url } =req.body;
    const shortUrl = await createShortUrlWithoutUser(url);
    res.send(process.env.APP_URL + shortUrl);
})

const redirectFromShortUrl = wrapAsync(async (req,res) =>{
    const {id} =req.params;
    const url=await getShortUrl(id);
    res.redirect(url.full_Url);
})
module.exports = {createShortUrl,redirectFromShortUrl};
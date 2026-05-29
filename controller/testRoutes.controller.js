const createShortUrl = async(req,res)=>{
  const { url } =req.body;
  const shortUrl = generateNanoId(7);
  const newUrl = new URL({
    full_Url:url,
    short_Url:shortUrl,
  });
  newUrl.save();
  res.send(shortUrl);
}
module.exports ={
    createShortUrl
}
const express = require('express');
const {createShortUrl} =require("../controller/testRoutes.controller.js");
const router = express.Router();

router.post("/",createShortUrl);  //we already imported testRoutes and called in server.js so we use "/" 

router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: "API working"
    });
});

module.exports = router;
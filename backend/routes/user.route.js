const express =require("express");
const {getAllUserUrls} = require("../controller/user.controller.js");
const {authMiddleware} = require("../middleware/auth.middleware.js");
const { get } = require("mongoose");

const router=express.Router();

router.get("/urls",authMiddleware, getAllUserUrls)

module.exports = router;
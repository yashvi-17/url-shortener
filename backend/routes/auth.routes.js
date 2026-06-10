const express =require("express");
const {register,login,logout,get_current_user} = require("../controller/auth.controller.js");
const {authMiddleware} = require("../middleware/auth.middleware.js");
const { get } = require("mongoose");

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout", logout);
router.get("/me", authMiddleware, get_current_user)

module.exports = router;
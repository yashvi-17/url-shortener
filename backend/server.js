require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express");
const {nanoid} =require("nanoid");
const URL = require("./models/shorturl.model.js");
const {redirectFromShortUrl} = require("./controller/testRoutes.controller.js")
const {errorHandler} = require("./utils/errorhandler.js");
const testRoutes = require('./routes/testRoutes.js');
const authRoutes = require('./routes/auth.routes.js');
const userRoutes = require("./routes/user.route.js");
const {attachUser} = require("./utils/attachUser.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

//backend deployment
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend-domain.vercel.app"
  ],
  credentials: true
}));

//allowing all the ports to connect here
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true //allows cookies to be sent
}));

// IMPORTANT: allows us to read JSON from request body
app.use(express.json()); //body parser
app.use(express.urlencoded({extended:true})); //for url encoded payloads [for forms data etc...]

mongoose.connect(process.env.MONGO_URI)
.then((conn) => console.log(`MongoDB connected: ${conn.connection.host}`))
.catch((err) => console.log(err));

app.use(cookieParser());

app.use(attachUser);

//for showing all the previously made urls
app.use("/api/user",userRoutes);

//authentication
app.use("/api/auth",authRoutes);

// test route
//GET : Redirection
app.get("/:id",redirectFromShortUrl);

//POST: create short url
// URL shortener route (we are building this)
app.use("/api/create",testRoutes)

//error
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,"0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
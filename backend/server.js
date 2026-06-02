require('dotenv').config("./.env");
const mongoose = require('mongoose');
const express = require("express");
const {nanoid} =require("nanoid");
const URL = require("./models/shorturl.model.js");
const {redirectFromShortUrl} = require("./controller/testRoutes.controller.js")
const {errorHandler} = require("./utils/errorhandler.js");
const testRoutes = require('./routes/testRoutes');
const cors = require("cors");

const app = express();

//allowing all the ports to connect here
app.use(cors());
// IMPORTANT: allows us to read JSON from request body
app.use(express.json()); //body parser
app.use(express.urlencoded({extended:true})); //for url encoded payloads [for forms data etc...]

mongoose.connect(process.env.MONGO_URI)
.then((conn) => console.log(`MongoDB connected: ${conn.connection.host}`))
.catch((err) => console.log(err));

// test route
//GET : Redirection
app.get("/:id",redirectFromShortUrl);
// app.get("/", (req, res) => {
//   res.json({
//     message: "Server running"
//   });
// });
// app.get('/test', (req, res) => {
//     res.json({
//         success: true,
//         message: "API working"
//     });
// });
// app.get('/user/:id', (req, res) => {
//     res.json({
//         userId: req.params.id
//     });
// });
// app.get('/search', (req, res) => {
//     res.json({
//         name: req.query.name
//     });
// });

//POST: create short url
// URL shortener route (we are building this)
app.use("/api/create",testRoutes)
// app.post("/shorten", (req, res) => {
//   const { longUrl } = req.body;

//   if (!longUrl) {
//     return res.status(400).json({
//       error: "longUrl is required"
//     });
//   }
  
// app.post('/shorten', (req, res) => {
//     const { url } = req.body;

//     const shortId = Math.random().toString(36).substring(2, 8);

//     res.json({
//         shortId: shortId
//     });
// });
//   // fake short code for now
//   const shortCode = Math.random().toString(36).substring(2, 8);

//   res.json({
//     longUrl,
//     shortUrl: `http://localhost:5000/${shortCode}`
//   });
// });

//error
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
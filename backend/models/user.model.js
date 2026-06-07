const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
    },
    //we dont use links array as the size limit of mongodb is 16Mb
    avatar:{
        type: String,
        required: false,
        default: "https://www.gravatar.com/avatar/000000000000000000000000000000000?d=mp"
    },
});

const user = mongoose.model("User",userSchema);

module.exports = user;
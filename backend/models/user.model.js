const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
        select: false,
    },
    //we dont use links array as the size limit of mongodb is 16Mb
    avatar:{
        type: String,
        required: false,
        default: "https://www.gravatar.com/avatar/000000000000000000000000000000000?d=mp"
    },
});

//checking password when signing in and encryption of password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);
};

//removes password field from returned object while login
userSchema.set("toJSON",{
    transform: function (doc,ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
    }
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,10);
});

const user = mongoose.model("User",userSchema);

module.exports = user;
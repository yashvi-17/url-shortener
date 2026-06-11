const {mongoose} = require("mongoose");

const shortUrlSchema = new mongoose.Schema({
    full_Url: {
        type: String,
        required: true,
    },
    short_Url: {
        type: String,
        required: true,
        index: true, //indexing
        unique: true, //unique vals
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //could be that user exist but no url so required is not true. Also used instead of links in the user schema.
    }
});

const URL = mongoose.model("url", shortUrlSchema);

module.exports =URL;
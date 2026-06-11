const wrapAsync = require("../utils/trycatchWrapper");
const { getAllUserUrlsDao } = require("../dao/user.dao.js");

const getAllUserUrls = wrapAsync(async (req, res) => {
    const { _id } = req.user;
    const urls = await getAllUserUrlsDao(_id);
    res.status(200).json({ message: "success", urls });
});

module.exports = { getAllUserUrls };
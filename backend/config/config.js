
const cookieOptions = {
    httpOnly: true,
    secure: true, //force true
    sameSite: "none", //required cross site cookies
    maxAge: 1000*60*60, //5mins
};

module.exports = cookieOptions;
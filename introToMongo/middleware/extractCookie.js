const cookie = require("cookie");

module.exports = (req,res,next) => {

    console.log(req.headers.cookie);

    const parsed = cookie.parse(req.headers.cookie || "");

    const token = parsed.token;

    req.authKey = token;

    console.log("extracte:",token);
    
    next()
}
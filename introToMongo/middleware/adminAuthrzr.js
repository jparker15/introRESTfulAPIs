const apiKey = process.env.MRENTAL_ADMIN;

function adminAuthrzr(req,res,next){

    const userKey = req.params.key;

    if (userKey != apiKey) return res.status(401).json({
        message:"Not authroized Admin Access Only"
    })
    
    next()

}

module.exports = adminAuthrzr;
require('dotenv').config()
const blacklisttoken = require('../models/token')
const jwt = require('jsonwebToken')



async function authenticationToken(req, res, next){
    const token=req.headers["auth_token"] 
    if(token == null){
        return res.send("Token not send")
    }
    let exist  = await blacklisttoken.findOne({token : token})
    if(exist){
        res.send("Don't be oversmart")
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, user)=>{
        if (err) return res.send("Token is no longer valid")
        req.user = user
        next()
    })
}

module.exports = authenticationToken
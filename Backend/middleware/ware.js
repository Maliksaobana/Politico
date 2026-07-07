require('dotenv').config()

const jwt = require("jsonwebtoken")
const politicalUser = require("../models/user")


const protect = async(req,res,next) => {
    try {
        let token = req.headers.authorization

        if(token && token.startsWith("Bearer ")) {
            token = token.split(' ')[1]
            const encoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await politicalUser.findById(encoded.id).select("-password")

            next()
        }else {
            res.status(400).json({message: 'not authorized'})
        }
    } catch (e) {
        res.status(400).json({message: 'no token found', err: e.message})
    }
}


const adminOnly = async(req,res,next) => {
    if(req.user && req.user.role === "admin") {
        next()
    }else{
        res.status(400).json({message: 'access denied, admin only'})
    }
}

module.exports = {
    protect,
    adminOnly
}
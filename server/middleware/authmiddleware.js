const asyncHandeler = require('express-async-handler');
const userModel = require('../Models/userModel');
const jwt = require('jsonwebtoken')


const protect = asyncHandeler(async(req, res, next) => {
    //const bearerHeader = req.headers['authorization']
    const bearerHeader = req.cookies.token;
    console.log(bearerHeader);  
    if(!bearerHeader){
        res.status(400).json("not authorized, no token")
    }
    if (typeof bearerHeader != 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        const decoded = jwt.verify(bearerToken, "vk18isthebestcricketerever" )
        req.user=await userModel.findById(decoded.id).select('-password');
        next()
    }else{
        res.status(400).json("not authorized")
    }
})


module.exports = protect
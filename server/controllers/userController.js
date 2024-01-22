const userModel = require('../Models/userModel')
const bcrypt = require('bcrypt')
const asyncHandeler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const { use } = require('../routes/userRoutes')


const registerUser =asyncHandeler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({message:'all filds are required.'})
    }
    const user = await userModel.findOne({ email });
    if (user) {
        res.status(400).json({message:'User already exist.'})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({ username, email, password: hashedPassword })
    if (newUser) {
        const token = jwt.sign({id: newUser._id}, "vk18isthebestcricketerever", {expiresIn:"30d"})
        res.cookie('token', token)
        res.status(200).json({
            id:newUser._id,
            username: newUser.username, 
            email: newUser.email,
            token:token
         });
    } else {
        res.status(400)
    }
})
const loginUser = asyncHandeler(async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({message:'all filds are required.'})
    }
    const user = await userModel.findOne({email})
    if(!user){
        res.status(400).json({message:'user does not exist.'})
    }
    const authUser = await bcrypt.compare(password, user.password)
    if(!authUser){
        res.status(400).json({message:'incorrect password.'})
    }else{
        const token = jwt.sign({id: user._id}, "vk18isthebestcricketerever", {expiresIn:"30d"})
        res.cookie('token', token)
        res.status(200).json({
            id:user._id, 
            username:user.username, 
            email:user.email,
            token:token
        })
    }   
})

const getUser = asyncHandeler(async(req, res)=>{ 
    //console.log(req.user)
    const token = req.cookies.token;
    //console.log(token)
    if(!token){
        res.json("token is not available")
    }
    const decoded = jwt.verify(token, "vk18isthebestcricketerever" )
    const user=await userModel.findById(decoded.id).select('-password');
    const userData = await userModel.findById(user.id);
    //console.log(userData)
    if(userData){
        res.status(200).json({
            id:userData._id,
            username:userData.username,
            email:userData.email
        })
    }else{
        res.status(400)
    }

})

const logoutUser= (req, res)=>{
  res.cookie('token', '').json('ok');
  
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    logoutUser
}
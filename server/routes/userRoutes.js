const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUser, logoutUser }= require('../controllers/userController')
const protect = require('../middleware/authmiddleware')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getuser', getUser);
router.post('/logout',logoutUser)


module.exports=router;



const express = require('express')
const router = express.Router();
const {getTask, addTask, deleteTask} = require('../controllers/taskController')
const protect = require('../middleware/authmiddleware')

router.get('/gettask', getTask)
router.post('/addtask', addTask)
router.delete('/deletetask/:id', deleteTask)

module.exports=router;
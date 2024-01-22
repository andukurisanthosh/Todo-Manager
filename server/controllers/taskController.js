const tasksModel = require('../Models/tasksModel')
const userModel = require('../Models/userModel')
const asyncHandeler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const getTask = asyncHandeler(async (req, res) => {
    const token = req.cookies.token;
    if(!token){
        res.json("token is not available")
    }
    const decoded = jwt.verify(token, "vk18isthebestcricketerever")
    const user = await userModel.findById(decoded.id).select('-password');
    const tasks = await tasksModel.find({ user: user.id })
    //console.log(tasks)
    
    if (!tasks) {
        res.status(400).json("tasks are not available")
    }
    
    res.status(200).json(tasks)
})

const addTask = asyncHandeler(async (req, res) => {
    const { task } = req.body;
    //console.log(task)
    const token = req.cookies.token;
    //console.log(token)
    const decoded = jwt.verify(token, "vk18isthebestcricketerever")
    const user = await userModel.findById(decoded.id).select('-password');
    if (!task) {
        res.status('all fields are requires')
    }
    const newtask = await tasksModel.create({
        user: user.id,
        task
    })
    if (newtask) {
        res.status(200).json(newtask)
    } else {
        res.status(400).json("unable to create task")
    }
})

const deleteTask = asyncHandeler(async (req, res) => {

    const token = req.cookies.token;

    if(!token){
        res.json("token is not available")
    }
    console.log(req.params.id)
    const decoded = jwt.verify(token, "vk18isthebestcricketerever")
    const user = await userModel.findById(decoded.id).select('-password');
    
    const task = await tasksModel.findById(req.params.id);
    console.log(task)
    if (!task) {
        res.status(400).json("task is not found")
    }
    if (!user) {
        res.status(400).json("user not found")
    }

    if (task.user != user.id) {
        res.status(400).json("user not authorized")
    }
    const { id } = req.params.id
    await tasksModel.deleteOne(id)
    res.status(200).json({ id: req.params.id })



})

module.exports = {
    getTask,
    addTask,
    deleteTask
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoutes')
const tasksRoute = require('./routes/tasksRoutes')
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:'http://localhost:3000', credentials:true}));
app.use(cookieParser())


app.use('/api/user', userRoute);
app.use('/api/tasks', tasksRoute);

mongoose.connect("mongodb://127.0.0.1:27017/taskDB")
    .then(app.listen(5000, () => {
        console.log("Listening on port 5000.")
    }))
    .catch(err => console.log(err))


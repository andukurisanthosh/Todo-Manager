const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },

    task: {
        type: String,
        required: true
    }

})

const tasksModel = mongoose.model("Tasks", taskSchema);

module.exports = tasksModel;
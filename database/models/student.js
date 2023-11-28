const mongoose = require('mongoose');

//schema is the structure of our database

const StudentSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
    },
    roll_number:
    {
        type: String,
        default: null,
    },
    email:
    {
        type: String,
        required: true,
    },
    attendance:
    {
        type: Array
    }
},
    {
        timestamps: true
    });


const StudentModel = mongoose.model("Students", StudentSchema);
module.exports = StudentModel;
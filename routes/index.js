const express = require('express');
const Router = express.Router();
const mongoose = require("mongoose");
const StudentModel = require('../database/models/student');

/* 
Route     /allusers
descrip   getting all users
params    none
access    public
method    get
*/

Router.get("/list", async (req, res) => {
  try {
    const users = await StudentModel.find();
    return res.json({ students: users })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

Router.post("/add", async (req, res) => {
  try {
    const { roll_number } = req.body.credentials;
    console.log(roll_number);
    let user = await StudentModel.findOne({ roll_number })
    if (!user) {
      const data = req.body.credentials
      // console.log(data);
      const user = await StudentModel.create(data);
      return res.status(200).json(user);
    }
    else
      return res.status(400).json({ error: 'Student with this roll number already exists' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

Router.post("/update", async (req, res) => {
  try {
    const rollNumbers = req.body.credentials; // Assuming rollNumbers is an array of roll numbers
    console.log(rollNumbers);

    if (!Array.isArray(rollNumbers)) {
      return res.status(400).json({ error: 'Roll numbers should be provided in an array.' });
    }

    const students = await StudentModel.find({});

    if (!students || students.length === 0) {
      return res.status(404).json({ error: 'No matching students found.' });
    }

    students.forEach(async (student) => {
      if (!student.attendance) {
        student.attendance = [];
      } 

      const isRollNumberPresent = rollNumbers.includes(student.roll_number);

      if (isRollNumberPresent) {
        student.attendance.push('P');
      } else {
        student.attendance.push('A');
      }

      await student.save();
    });

    return res.status(200).json({ message: 'Attendance updated successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
})


module.exports = Router;
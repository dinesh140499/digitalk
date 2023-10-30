const express = require('express')
const { students, createStudent, getStudent, deleteStudent, updateStudent,pdfDownload } = require('../controller/student')
const route = express.Router()

route.route('/students').get(students)
route.route('/create').post(createStudent)
route.route('/student/:id').post(getStudent).delete(deleteStudent).put(updateStudent)
route.route('/pdfgenerate').post(pdfDownload)

module.exports = route
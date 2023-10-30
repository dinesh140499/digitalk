const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config({ path: ".env" })


// Db connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DB, {
    dbName: "student"
}).then(() => console.log("database connected")).catch(e => console.log("database not connected"))


// middlewares
app.use(cors())
app.use(express.json())
// const { students } = require('./controller/student')
const student = require('./routes/student')
app.use(express.urlencoded({ extended: true }));
app.use('/api', student)


app.listen(process.env.PORT, () => {
    console.log(`server is running on port no: ${process.env.PORT}`)
})
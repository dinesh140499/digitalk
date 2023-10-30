const User = require('../model/user')
const puppeteer = require('puppeteer')
const path = require('path')
const os = require('os');


exports.students = async (req, res) => {
    try {
        const user = await User.find()
        if (!user) {
            return res.status(400).json({
                success: false,
                user
            })
        }
        res.json({
            success: true,
            user

        })
    } catch (error) {
        console.log(error)
    }
}

exports.createStudent = async (req, res) => {
    try {
        const { name, email, subject } = req.body
        if (!name || !email || !subject) {
            return res.json({
                success: false,
                message: "field cannot be nul"
            })
        }
        await User.create({
            name,
            email,
            subject
        })

        res.status(201).json({
            success: true,
            message: "User Register Successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updateStudent = async (req, res) => {
    try {
        const { fname, email, sub } = req.body
        let user = await User.findById(req.params.id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }

        user = await user.updateOne({
            name: fname,
            email: email,
            subject: sub,
        },)

        res.json({
            success: true,
            message: "student updated",
        })
    } catch (error) {
        console.log(error)
    }
}

exports.getStudent = async (req, res) => {
    try {
        let user = await User.findById(req.params.id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }
        res.json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error)
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        let user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }
        res.json({
            success: true,
            message: "user deleted"
        })
    } catch (error) {
        console.log(error)
    }
}

exports.pdfDownload = async (req, res) => {
    let val = Object.keys(req.body)
    try {
        if (!val) {
            return res.status(400).send('Invalid URL');
        }
        const browser = await puppeteer.launch({
            headless: 'false',
        })
        const page = await browser.newPage()

        // navigate page
        await page.goto(val[0])
        const userDownloads = path.join(os.homedir(), 'Downloads', 'gfg.pdf');
        await page.pdf({ path: userDownloads, format: "A4", printBackground: true });
        await browser.close();

        res.json({
            success: true,
            message: "pdf downloaded"
        }).status(200)

    } catch (error) {
        console.log(error)
    }

}
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
require('dotenv').config()



function GenerateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" })
}


async function LoginUser(req, res) {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email: email.toLowerCase() })

        if (!user) {
            return res.status(404).json({ status: 404, msg: "User doesn't exist. Please create a new account" })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return res.status(401).json({ status: 401, msg: "Incorrect username or password" })
        }

        delete user._doc["password"]

        const { _id } = user._doc
        const payload = { _id }

        const access_token = GenerateAccessToken(payload)

        req.session.accessToken = access_token

        return res.status(200).json({
            status: 200,
            msg: "Login Successful",
            user: {
                ...user._doc,
                accessToken: access_token
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, msg: "Internal server error" })
    }
}

async function SignupUser(req, res) {
    try {
        const userData = req.body

        const isAlreadyExist = await userModel.exists({ email: userData.email.toLowerCase() })

        if (isAlreadyExist) {
            return res.status(409).json({
                status: 409,
                msg: "User Already exists with this account."
            })
        }

        const hashPassword = await bcrypt.hash(userData.password, 10)

        const user = await userModel.create({
            ...userData,
            email: userData.email.toLowerCase(),
            password: hashPassword,
        })

        delete user._doc["password"]

        const { _id } = user._doc
        const payload = { _id }

        const access_token = GenerateAccessToken(payload)

        req.session.accessToken = access_token

        return res.status(200).json({
            status: 200,
            msg: "Account creation Successful",
            user: {
                ...user._doc,
                accessToken: access_token
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, msg: "Internal server error" })
    }
}

async function LogoutUser(req, res) {
    try {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ status: 500, msg: "Can't logout at this moment. Please try again!" })
            }
            res.clearCookie('connect.sid', { path: '/' })
            return res.status(200).json({ status: 200, msg: "Logout Successful" })
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, msg: "Internal server error" })
    }
}


module.exports = {
    LoginUser,
    SignupUser,
    LogoutUser,
}
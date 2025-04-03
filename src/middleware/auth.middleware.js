const jwt = require('jsonwebtoken')
require('dotenv').config()


function protect(req, res, next) {
    try {
        const accessToken = req.headers.authorization.split(' ')[1]
        // const accessToken = req.session.accessToken
        if (accessToken) {
            const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            req.user = payload
            next()
        } else {
            DestroySessions(req, res)
            return res.status(400).json({ msg: "Bad request" })
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({ msg: "Un-authorized access denied" })
    }
}

function DestroySessions(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ msg: "Internal server error" })
        }
        res.clearCookie('connect.sid')
        res.status(200).json({ msg: "Logout successful" })
    })
}

module.exports = {
    protect,
}
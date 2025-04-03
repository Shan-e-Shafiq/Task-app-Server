const mongoose = require('mongoose')
require('dotenv').config()


async function ConnectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected....")
    } catch (error) {
        console.log(error)
    }
}


module.exports = ConnectToDB
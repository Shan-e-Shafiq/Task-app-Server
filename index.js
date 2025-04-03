const express = require('express')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const ConnectToDB = require('./db')
require('dotenv').config()
const routes = require('./src/routes')


const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
        ttl: 7 * 24 * 60 * 60
    }),
    cookie: {
        httpOnly: true,
        // sameSite: 'none',
        sameSite: 'lax',
        // secure: true,
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// ROUTES

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Server is UP' })
})
app.use('/api', routes)


app.listen(2000, async () => {
    await ConnectToDB()
    console.log("http://localhost:2000")
})

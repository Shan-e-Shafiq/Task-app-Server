const router = require('express').Router()
const {
    LoginUser,
    SignupUser,
    LogoutUser,
} = require('../controllers/auth.controller')


// ROUTES

router.post('/user/login', LoginUser)
router.post('/user/signup', SignupUser)
router.get('/user/logout', LogoutUser)


module.exports = router
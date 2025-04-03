const router = require('express').Router()
const authRoutes = require('./auth.routes')
const tableRoutes = require('./table.routes')


router.use(authRoutes)
router.use(tableRoutes)


module.exports = router
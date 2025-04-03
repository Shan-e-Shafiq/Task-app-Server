const { getData, getDataByName, getDataById, getDataByManufacturer, getDataByModel, getDataByDriveType, getDataByPriceRange, getDataByPostingDate, getDataByUpdateDate, editTableData, deleteData } = require('../controllers/table.controller')
const { protect } = require('../middleware/auth.middleware')
const router = require('express').Router()


router.get('/table/get-all-data', getData)
router.get('/table/get-data-by-name/:name', getDataByName)
router.get('/table/get-data-by-id/:id', getDataById)
router.get('/table/get-data-by-manufacturer/:manufacturer', getDataByManufacturer)
router.get('/table/get-data-by-model/:model', getDataByModel)
router.get('/table/get-data-by-drive/:drive', getDataByDriveType)
router.get('/table/get-data-by-price', getDataByPriceRange)
router.get('/table/get-data-by-postingDate/:date', getDataByPostingDate)
router.get('/table/get-data-by-updateDate/:date', getDataByUpdateDate)
router.post('/table/update-data/:id', protect, editTableData)
router.delete('/table/delete-data/:id', protect, deleteData)


module.exports = router
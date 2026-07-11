const { 
    createOffice,
    getAllPoliticalOffice,
    deleteOffice,
    editSpecificPoliticalOffice,
    getSpecificPoliticalOffice} = require('../controllers/officecontroller')

const { protect,adminOnly } = require('../middleware/ware')

const router = require('express').Router()


router.delete('/officelist/:id', protect, adminOnly,deleteOffice)

router.get('/officelist', protect, getAllPoliticalOffice)

router.get('/officelist/:id', protect, getSpecificPoliticalOffice)

router.patch('/officelist/edit/:id', protect,adminOnly,editSpecificPoliticalOffice)

router.post('/createoffice',protect,adminOnly,createOffice)



module.exports = router
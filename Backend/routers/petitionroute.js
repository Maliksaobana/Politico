const { makingPetition,getAllPetition,acceptPetition,getPetitionById }= require('../controllers/petitioncontroller')

const { protect,adminOnly } = require('../middleware/ware')

const router = require('express').Router()



router.get('/', protect, getAllPetition)
router.get('/petitiondetails/:id', protect, getPetitionById)

router.patch('/:id', protect,adminOnly,acceptPetition)

router.post('/makepetition/:id',protect,makingPetition)



module.exports = router
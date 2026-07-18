const {getOnlyWinners,declareWinner} = require('../controllers/winnercontroller')

const { protect,adminOnly } = require('../middleware/ware')

const router = require('express').Router()




router.get('/', protect, getOnlyWinners)

router.post('/:id',protect,adminOnly,declareWinner)



module.exports = router
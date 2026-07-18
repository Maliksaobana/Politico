const { voteCandidate,getAllParticipates,getParticipant } = require('../controllers/votecontroller')
const { protect } = require('../middleware/ware')

const router = require('express').Router()


router.get('/', protect, getAllParticipates)
router.get('/contestant/:id', protect, getParticipant)

router.patch('/:id', protect ,voteCandidate)

module.exports = router
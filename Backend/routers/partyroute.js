const { 
    createParty, 
    editAParty, 
    deleteAParty,
    joinParty,
    getSpecificParty, 
    getAllParty} = require('../controllers/partycontroller.js')
const { adminOnly,protect } = require('../middleware/ware')

const router = require('express').Router()

router.post('/createparty',protect,adminOnly,createParty)
router.patch('/editparty/:id',protect,adminOnly,editAParty)
router.patch('/partylist/join/:id',protect,joinParty)
router.delete('/deleteparty/:id',protect,adminOnly,deleteAParty)
router.get('/partylist',protect,getAllParty)
router.get('/partylist/:id',protect,getSpecificParty)


module.exports = router
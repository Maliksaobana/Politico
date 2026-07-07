const { 
    createParty, 
    editAParty, 
    deleteAParty, 
    getAllParty,
    getSpecificParty,
    createOffice,
    getAllPoliticalOffice,
    getSpecificPoliticalOffice,
    vote,
    petitionElectionResult,
    deleteOffice} = require('../controllers/partycontroller.js')
const { adminOnly,protect } = require('../middleware/ware')

const router = require('express').Router()

router.post('/createparty',adminOnly,createParty)
router.patch('editparty/:id',adminOnly,editAParty)
router.delete('/deleteparty/:id',adminOnly,deleteAParty)
router.get('/partylist',getAllParty)
router.post('/partylist/party',getSpecificParty)
router.post('/party/office/createoffice',adminOnly,createOffice)
router.post('/party/office/createoffice',adminOnly,deleteOffice)
router.post('/party/office/createoffice',protect,petitionElectionResult)
router.patch('/election/vote',vote)
router.get('/office/',getAllPoliticalOffice)
router.post('/office/:id',getSpecificPoliticalOffice)




module.exports = router
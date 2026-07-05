const { 
    createParty, 
    editAParty, 
    deleteAParty, 
    getAllParty,
    getSpecificParty,
    createOffice,
    getAllPoliticalOffice,
    getSpecificPoliticalOffice,
    vote} = require('../controllers/partycontroller')

const router = require('express').Router()

router.post('/v1/createparty',createParty)
router.patch('/v1/editparty/:id',editAParty)
router.delete('/v1/deleteparty/:id',deleteAParty)
router.get('/v1/partylist',getAllParty)
router.get('/v1/partylist/:id',getSpecificParty)
router.post('/v1/party/office/createoffice',createOffice)
router.patch('/v1/election/vote',vote)
router.get('/v1/office/',getAllPoliticalOffice)
router.get('/v1/office/:id',getSpecificPoliticalOffice)




module.exports = router
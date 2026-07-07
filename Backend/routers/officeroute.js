const { 
    signInUser, 
    signUpUser,
    editClientProfile,
    getUserProfile,
    createNewPAssword } 
    = require('../controllers/officecontroller')
const { protect } = require('../middleware/ware')

const router = require('express').Router()



router.post('/signin',signInUser)

router.patch('/profile/edit', protect, editClientProfile)


router.patch('/profile/forgetpassword', protect, createNewPAssword)

router.get('/profile', protect, getUserProfile)

router.post('/signup', signUpUser)

module.exports = router
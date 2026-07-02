const { 
    signInUser, 
    signUpUser,
    editClientProfile,
    getUserProfile } 
    = require('../controllers/authcontroller')
const { protect } = require('../middleware/ware')

const router = require('express').Router()



router.post('/signin',signInUser)

router.patch('/profile/edit', protect, editClientProfile)

router.get('/profile', protect, getUserProfile)

router.post('/signup', signUpUser)

module.exports = router
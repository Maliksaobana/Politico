const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const User = require("../models/user")


const errorMessages = {
    signUpUser : 
        {
            status: '400',
            message:'error registering user'
        },
    signInUser: 
        {
            status: '400',
            message:'error getting details of user'
        },
    editClientProfile: 
        {
            status: '400',
            message:"can't get users",
        },
    specificUser: 
        {
            status: '400',
            message:'no user available'
        }
}


let check;

const getUserId = (userId) => jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '2d'})


// signup new user
const signUpUser = async (req,res) => {
    try {
        const { 
            name,
            email,
            password } = req.body

        const userExists = await User.findOne( {email} )

        if(userExists) {
            return res.status(400).json({message: 'user already exists'})
        }
        
        let role = 'member'

        if(role && role !== 'member' ) {
            role = 'politician'
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            name,
            email,
            role,
            password: hashPassword,
        })
        
        res.status(200).json({
            status: '200',
            body: {
                _id: newUser.id,
                name: newUser.name,
                role: newUser.role,
                email: newUser.email,
                token: getUserId(newUser.id)
            }
        })
    } catch (error) {
        res.status(400).json(errorMessages.signUpUser)
    }
} 

// login member
const signInUser = async (req,res) => {
    try {
        const { email, password } = req.body
        const userExists = await User.findOne({ email })
        
        if(!userExists) {
            return res.status(400).json({status:"400",message: "no user found"})
        }

        const isMatch = await bcrypt.compare(password,userExists.password)

        if(!isMatch) {
            return res.status(400).json({message: 'incorrect password'})
        }

        res.status(200).json({
            status: '200',
            body: {
                _id: userExists.id,
                name: userExists.name,
                role: userExists.role,
                email: userExists.email,
                hasAParty: userExists.hasAParty,
                politicalPosition: userExists.politicalPosition,
                votedParty: userExists.votedParty,
                votedCandidates: userExists.votedCandidates,
                token: getUserId(userExists.id)
            }
        })
    } catch (e) {
        res.send(400).json(errorMessages.signInUser)
    }
} 

const editClientProfile = async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')

        if(!user) {
           return res.status(400).json({message: 'no user found', code: user})
        }

        const updateUserDetails = req.body

        for (let key in updateUserDetails) {
            if (user[key] !== undefined) {
                user[key] = updateUserDetails[key];
            }
        }

        await user.save()

        res.json(user)
    } catch (error) {
        res.status(400).json(errorMessages.editClientProfile)
    }
}

const getUserProfile = async (req,res) => {
    try {
        
        const user = await User.findById(req.user.id).select('-password')


        if(!user) {
           return res.status(400).json({message: 'no user found', code: user})
        }

        res.json(user)
    } catch (e) {
        res.status(400).json({code: e.message})
    }
}


module.exports = {signUpUser, signInUser, editClientProfile,getUserProfile}
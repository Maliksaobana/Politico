const {Party} = require('../models/party.js')
const User = require("../models/user.js")



// create a party
const createParty = async (req,res) => {
    try {
        const { partyName,
                hqAddress,
                partyColor,
                partyShortName,
                partySlogan,
                partyMotto } = req.body

        const partyExists = await Party.findOne({ partyName })

        if(partyExists) {
            res.status(400).json({status:300,message:'party already exists'})
            throw new Error('party already exists')
        }

        const newParty = await Party.create({
            partyName,
            hqAddress,
            partyColor,
            partyShortName,
            partySlogan,
            partyMotto
        })

        res.status(200).json({status:200,body:{
            _id: newParty.id,
            partyName: newParty.partyName,
            hqAddress: newParty.hqAddress,
            partyColor: newParty.partyColor,
            partySlogan: newParty.partySlogan,
            partyMotto: newParty.partyMotto,
            partyShortName: newParty.partyShortName
        }})
    } catch (e) {
        res.status(400).json({err: '400',message: e.message})
    }
}


const getAllParty = async (req,res) => {
    try {
        const allParty = await Party.find()

        if(!allParty || allParty.length < 0) {
            res.status(400).json({status:400,message:'no party'})
        }

        res.status(200).json({status:200,body:allParty})
    } catch (e) {
        res.status(400).json({err: '400',message:'error fetching party'})
    }
}


const getSpecificParty = async (req,res) => {
    try {

        const doesPartyExists = await Party.findById(req.params.id)

        if(!doesPartyExists) {
            res.status(400).json({status:400,message:"no such party"});

            throw new Error('error finding party. check party name')
        }

        res.status(200).json({status:200,body:doesPartyExists})
    } catch (error) {
        res.send(400).json({status:400,message:error.message})
    }
}


const editAParty = async (req,res) => {
    try {
        const newDetails = req.body
        const getPartyDoc = await Party.findById(req.params.id)
        if(!getPartyDoc) {
            res.status(400).json({status:400,message:"no such party exists, check the details and try again"})
            throw new Error('error getting party')
        }

        for (let key in newDetails) {
            if (getPartyDoc[key] !== undefined) {
                getPartyDoc[key] = newDetails[key];
            }
        }

        await getPartyDoc.save()

        res.status(200).json({
            status:200,
            body: getPartyDoc
        })
    } catch (e) {
        res.status(400).json({status:400,message:e.message})
    }
}

const joinParty = async (req,res) => {
    try {
        const getParty = await Party.findById(req.params.id)
        const getUser = await User.findById(req.user.id)

        if(!getParty) {
            res.status(400).json({
                status:400,
                message:"party doesnt exist. check the details and try again"
            })
            throw new Error("error getting party. check details")
        }

        

        if(getUser.hasAParty === true) {
            res.status(400).json({status:400,message:"user already has a party"})
            throw new Error("user has a party")
        }

        getUser.hasAParty = true
        getUser.party = getParty.id

        await getUser.save()
        

        res.status(200).json({
            status:200,
            body: getParty
        })
        
    } catch (e) {
        res.status(400).json({
            status:400,
            message:e.message
        })
    }
}

const deleteAParty = async (req,res) => {
    try {
        const getPartyDoc = await Party.findById(req.params.id)
        
        if(!getPartyDoc) {
            res.status(400).json({status:400,message:'no party found, check the details and try again'})
            throw new Error("error getting party")
        }

        await Party.deleteOne(getPartyDoc)

        res.status(200).json({
            status: 200,
            body: await Party.find()
        })
    } catch (e) {
        res.status(400).json({
            status:400,
            message: e.message
        })
    }
}
// const petitionElectionResult = async (req,res) => {}


module.exports = {
    createParty,
    getAllParty,
    getSpecificParty,
    editAParty,
    joinParty,
    deleteAParty
}
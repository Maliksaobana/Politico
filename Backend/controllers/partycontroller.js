const Party = require('../models/party.js')




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
            res.status(400).json({status:400,message:'party already exists'})
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
        res.status(400).json({err: '400',message: 'error creating party'})
    }
}
const createOffice = async (req,res) => {
    try {
        const { officeid, 
                createdOn,
                typeOfOffice, 
                nameOfOffice,
                roleOfOffice, 
                creator } = req.body
    } catch (e) {
        res.status(400).json({err: '400',message: 'error creating party'})
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

const getAllPoliticalOffice = async (req,res) => {}

const getSpecificParty = async (req,res) => {
    try {

        const doesPartyExists = await Party.findOne(req.body)

        if(!doesPartyExists) {
            res.status(400).json({status:400,message:"no such party"});

            throw new Error('error finding party. check party name')
        }

        res.status(200).json({status:200,body:doesPartyExists})
    } catch (error) {
        res.send(400).json({status:400,message:"no such party"})
    }
}

const getSpecificPoliticalOffice = async (req,res) => {}

const vote = async (req,res) => {
    try {
        const { positionID,
                votersID,
                position,
                candidate,
                partyID,
                partyName,
                hasVoted } = req.body
    } catch (e) {
        res.status(400).json({message: "couldn't place vote"})
    }
}


const editAParty = async (req,res) => {}

const deleteAParty = async (req,res) => {}
const petitionElectionResult = async (req,res) => {}
const deleteOffice = async (req,res) => {}

module.exports = {
    createParty,
    createOffice,
    getAllParty,
    getAllPoliticalOffice,
    getSpecificParty,
    getSpecificPoliticalOffice,
    vote,
    editAParty,
    deleteAParty,
    petitionElectionResult,
    deleteOffice
}
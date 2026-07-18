require("dotenv").config()

const Vote = require("../models/vote")
const User = require("../models/user");
const Petition = require("../models/petition");
const Office = require("../models/office")
const Winner = require("../models/winner")



const acceptPetition = async (req,res) => {
    try {
        const {adminRemark} = req.body
        const petition = await Petition.findById(req.params.id);
        const candidateAffected = await Vote.findById(petition.onWhichVote);
        const userWaiting = await User.findById(petition.whoMadePetition);
        const officeAffected = await Office.findById(petition.onWhichPosition);
        const checkWinner = await Winner.findById(petition.onWhichVote)

        if(!petition) {
            res.status(400).json({
                status:400,
                message: "Cant find petition"
            })
            throw new Error("Cant find petition")
        }

        let anticipatedRemark = "rejected"

        if(adminRemark === 'accept') {
            anticipatedRemark = adminRemark
        }

        if(anticipatedRemark === "accept") {
            petition.petitionFeedBack = true

            await petition.save()

            userWaiting.petitionStatus = "accepted"

            await userWaiting.save()

            candidateAffected.totalVotes = candidateAffected.totalVotes - Number(2)

            if(candidateAffected.statusOfElection === "winner") {
                candidateAffected.statusOfElection = "contesting"
            }

            await candidateAffected.save()

            if(!officeAffected.isVancant) {
                officeAffected.isVancant = true
                officeAffected.currentOccupant = null
                officeAffected.currentParty = null
            }
        
            await Winner.deleteOne(checkWinner)
            
            await officeAffected.save()

        }else {

            userWaiting.petitionStatus = "rejected"

            candidateAffected.totalVotes = candidateAffected.totalVotes

            petition.petitionFeedBack = true
            
            await petition.save()
            await candidateAffected.save()
            await userWaiting.save()
        }

        res.status(200).json({
            status:200,
            body: userWaiting
        })
    } catch (e) {
        res.status(400).json({
            status: 400,
            message: e.message
        })
    }
}


const getAllPetition = async (req,res) => {
    try {
        const getAllPetition = await Petition.find().populate("whoMadePetition","-email -password").populate("onWhichParty","-_id -partyCandidates -partyPositions").populate("onWhichPosition","-_id").populate("onWhichCandidate","name")

        res.status(200).json({
            status:200,
            body: getAllPetition
        })
    } catch (e) {
        res.status(400).json({
            status: 400,
            message: e.message
        })
    }
}

const getPetitionById = async (req,res) => {
    try {
        const getPetition = await Petition.findById(req.params.id).populate("whoMadePetition","-email -password").populate("onWhichParty","-_id -partyCandidates -partyPositions").populate("onWhichPosition","-_id").populate("onWhichCandidate","campaignPromise")

        

        res.status(200).json({
            status:200,
            body: getPetition
        })
    } catch (e) {
        res.status(400).json({
            status: 400,
            message: e.message
        })
    }
}

const makingPetition = async (req,res) => {
    try {
        const { petition, reasonForPetition } = req.body
        const getContestingCandidate = await Vote.findById(req.params.id);
        const getWhoIsMakingPetition = await User.findById(req.user.id)

        if(!getContestingCandidate) {
            res.status(400).json({status:400,message:"Cant find candidate"})
            throw new Error("Contesting candidate not found")
        }

        if(petition !== "petition") {
            res.status(400).json({status:400,message:"Must make petition known"})
            throw new Error("Must make a petition")
        }

        const alreadyMadePetition = getWhoIsMakingPetition.petitionBlock.some(item => item.submittedPetition.toString() === getContestingCandidate.id.toString() ) 

        if(alreadyMadePetition) {
            res.status(400).json({status:400,message: "Already made petition"})
            throw new Error("Already made petition")
        }

        const newPetion = await Petition.create({
            whoMadePetition: getWhoIsMakingPetition.id,
            onWhichParty: getContestingCandidate.partyID,
            onWhichPosition: getContestingCandidate.positionID,
            onWhichCandidate: getContestingCandidate.candidateID,
            onWhichVote: getContestingCandidate.id,
            reasonForPetition
        })

        const newPetitionBlock = {
            submittedPetition: getContestingCandidate.id,
            myPetition: newPetion._id,
            onWhichParty: getContestingCandidate.partyID,
            onWhichPosition: getContestingCandidate.positionID,
            onWhichCandidate: getContestingCandidate.candidateID,
        }

        getWhoIsMakingPetition.petitionBlock.push(newPetitionBlock)
        getWhoIsMakingPetition.petitionStatus = "under review"


        await getWhoIsMakingPetition.save()

        res.status(200).json({
            status:200,
            body: newPetion
        })
    } catch (e) {
        res.status(400).json({
            status: 400,
            message: e.message
        })
    }
}


module.exports = {makingPetition,getAllPetition,acceptPetition,getPetitionById}
require('dotenv').config()

const Vote = require("../models/vote")
const User = require("../models/user")

// the vote route is going to do 


/*
    **one: it is going to get total votes count and declare a winner when dey get to the required Number
    **two: it will get the list of people that voted
    **three: it will update the office route and declare a winner for the office
    **four: store the user list of people he/she voted for during the election
*/

const getAllParticipates = async (req,res) => {
    try {
        const allCandidates = await Vote.find().populate("candidate","campaignPromise").populate("positionID","-isVancant -currentOccupant -officeContestantStatus -currentParty -createdAt -updatedAt").populate("candidateID","-password -votedParticipatedOn -hasAParty -email -createdAt -updatedAt -party").populate("partyID","partyName")

        res.status(200).json({
            status:200,
            body: allCandidates
        })
    } catch (e) {
        res.status(400).json({message: e.message})
    }
}

const voteCandidate = async (req,res) => {
    try {
        const { vote } = req.body

        const candidateToVoteFor = await Vote.findById(req.params.id)

        const userThatVoted = await User.findById(req.user.id)

        if(!candidateToVoteFor) {
            res.status(400).json({status:400,message:"candidate does not exists"})
            throw new Error("candidate not found")
        }

        candidateToVoteFor.totalVotes = candidateToVoteFor.totalVotes + Number(vote)

        await candidateToVoteFor.save()

        const passQueryForParticipation = {
            officeVotedFor: candidateToVoteFor.positionID,
            candidatedVotedFor: candidateToVoteFor.candidateID
        }

        userThatVoted.votedParticipatedOn = passQueryForParticipation

        await userThatVoted.save()

        res.status(200).json({
            status:200,
            body: candidateToVoteFor
        })


    } catch (e) {
        res.status(400).json({message: e.message})
    }
}


module.exports = {voteCandidate,getAllParticipates}
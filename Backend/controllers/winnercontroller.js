const Office = require("../models/office")
const User = require("../models/user")
const Vote = require("../models/vote")
const Winners = require("../models/winner")



const getOnlyWinners = async (req,res) => {
    try {
        const getAllWinners = await Winners.find().populate("officeContesting").populate("candidateContesting").populate("party") 

        if(getAllWinners.length === 0) {
            res.status(200).json({status:200,message:"no winners yet"})
            throw new Error("no winners yet")
        }


        res.status(200).json({
            status:200,
            body: getAllWinners
        })
    } catch (e) {
        res.status(400).json({
            status:400,
            message: e.message
        })
    }
}

const declareWinner = async (req,res) => {
    try {
        const {winnerOfElection} = req.body

        const candidateToDeclare = await Vote.findById(req.params.id)
        const theOffice = await Office.findById(candidateToDeclare.positionID)
        const theCandidate = await User.findById(candidateToDeclare.candidateID)

        if(!candidateToDeclare) {
            res.status(400).json({status:400,message:"Cant find candidate in election rooster"})
            throw new Error("Can't find candidate")
        }

        let anticipatedResult = "loser"

        if(winnerOfElection === "winner") {
            anticipatedResult = winnerOfElection
        }

        if(anticipatedResult !== "winner") {
            throw new Error("Must be a winner")
        }

        if(candidateToDeclare.statusOfElection === "winner" || !theOffice.isVancant) {
            res.status(400).json({status:400,message:"Already won office"})
            throw new Error("Already have a winner")
        }

        const winnerYearBook = await Winners.create(
            {
                officeContesting: candidateToDeclare.positionID,
                candidateContesting: candidateToDeclare.candidateID,
                party: candidateToDeclare.partyID,
                declaredWinner: true
            }
        )


        const userPositions = {
            office: theOffice._id
        }

        theOffice.isVancant = false
        theOffice.currentOccupant = winnerYearBook.candidateContesting
        theOffice.currentParty = winnerYearBook.party

        await theOffice.save()

        candidateToDeclare.statusOfElection = "winner"
        candidateToDeclare.winnersID = winnerYearBook._id

        await candidateToDeclare.save()

        theCandidate.officesHeld.push(userPositions)

        await theCandidate.save()



        res.status(200).json({
            status: 200,
            body: winnerYearBook
        })
    } catch (e) {
        res.status(400).json({
            status: 400,
            message: e.message
        })
    }
}

module.exports = {getOnlyWinners,declareWinner}
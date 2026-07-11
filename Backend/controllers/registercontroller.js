
const candidate = require("../models/register")
const Office = require("../models/office")
const User = require("../models/user")
const vote = require("../models/vote")


const getAllCandidate = async (req,res) => {
    try {
        
        const allCandidate = await candidate.find().populate("positionID","-isVancant -currentOccupant -officeContestantStatus -currentParty").populate("candidateId","-password -votedParticipatedOn -hasAParty -email -party").populate("party","partyName")

        if(allCandidate.length < 0) {
            res.status(400).json({status:400,message:"no candidate found"})
            throw new Error("no registered candidate")
        }

        res.status(200).json({
            status:200,
            body: allCandidate
        })

    } catch (e) {
        res.status(400).json({
            status:400,
            message: e.message
        })
    }
}

const runForOffice = async(req,res) => {
    try {

        const { campaignPromise } = req.body
        const getContestantId = await User.findById(req.user.id)
        const getOfficeParam = await Office.findById(req.params.id)

        if(!getOfficeParam) {
            res.status(400).json("cant find office, check details")
            throw new Error("error getting office")
        }

        if(!getContestantId || getContestantId.hasAParty === false) {
            res.status(400).json({status:400,message:"user must be a part of a political party"})
            throw new Error("can't run for party")
        }

        const newContestant = await candidate.create({
            positionID: getOfficeParam.id,
            candidateId: getContestantId.id,
            party: getContestantId.party,
            campaignPromise,        
        })

        getContestantId.role = "politician"

        await getContestantId.save()

        res.status(200).json({
            status:200,
            body: newContestant
        })
        
    } catch (e) {
        res.status(400).json({
            status: 400,
            message: e.message
        })
    }
}

const registerContestant = async (req,res) => {
    try {

        const isCandidate = await candidate.findById(req.params.id)

        const { statusOfCandidate } = req.body

        let isAccepted = false

        if( statusOfCandidate === 'accept') {
            isAccepted = true
        }

        isCandidate.isAccepted = isAccepted

        if(isCandidate.isAccepted === true) {
            await isCandidate.save()

            const getPotentialCandidate = await vote.create({
                candidate: isCandidate.id,
                candidateID: isCandidate.candidateId,
                positionID: isCandidate.positionID,
                partyID: isCandidate.party,
                totalVotes: 0,
                status:'contesting',
            })

        }else {
            await isCandidate.save()
        }

        res.status(200).json({
            status:200,
            body: isCandidate
        })
    } catch (e) {
        res.status(400).json({
            status:400,
            message: e.message
        })
    }
}

module.exports = {
    runForOffice,
    registerContestant,
    getAllCandidate
}
const mongoose = require("mongoose")
const petition = require("./petition")



const voteManagement = new mongoose.Schema({
    whoVotedFor: {type: mongoose.Schema.Types.ObjectId,ref: "Vote"},
    personVotedFor: {type: mongoose.Schema.Types.ObjectId,ref: "Client"},
    partyVotedFor: {type: mongoose.Schema.Types.ObjectId,ref: "Party"},
    officeVotedFor: {type: mongoose.Schema.Types.ObjectId,ref: "Office"},
    hasVoted: {type:Boolean,default:false}
})

const madePetition = new mongoose.Schema({
    submittedPetition: {type: mongoose.Schema.Types.ObjectId,ref:"Vote"},
    onWhichParty: {type: mongoose.Schema.Types.ObjectId, ref:'Party'},
    onWhichPosition: {type: mongoose.Schema.Types.ObjectId, ref:'Office'},
    onWhichCandidate: {type: mongoose.Schema.Types.ObjectId, ref:'Candidate'}
})


const participation = new mongoose.Schema({
    voteRef: {type: mongoose.Schema.Types.ObjectId,ref:"Vote"},
    officeVotedFor: {type: mongoose.Schema.Types.ObjectId,ref:"Office"},
    candidatedVotedFor: {type: mongoose.Schema.Types.ObjectId, ref: "Client"},
    partyVotedFor: {type: mongoose.Schema.Types.ObjectId, ref: "Party"},
    hasVoted: {type: Boolean, default: false}
})

const applicationDetails = new mongoose.Schema({
    formID: {type: mongoose.Schema.Types.ObjectId, ref:"Candidate"},
    officeID: {type: mongoose.Schema.Types.ObjectId, ref:"Office"},
    isApproved: {type: Boolean, default: false},
    isRejected: {type: Boolean,default: false}
})

const positionHeld = new mongoose.Schema({
    office: { type: mongoose.Schema.Types.ObjectId, ref:"Office" },
    currentOffice: {type:Boolean,default: false}
})

const politicalUser = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        party: {type:mongoose.Schema.Types.ObjectId, ref:'Party',default:null}, // get party id and populate with party name, shortname, role, motto and slogan
        office: {type:mongoose.Schema.Types.ObjectId, ref:'Office',default:null}, 
        role: { type: String, enum: ['member','admin',"politician"], default: 'member' },
        hasAParty: { type: Boolean, default: false },
        hasSubmittedApplication: { type: Boolean, default: false },
        isApproved: { type: Boolean, default: false },
        applicationID: applicationDetails,
        votedParticipatedOn: [participation],
        officesHeld: [positionHeld],
        petitionBlock: [madePetition],
        following: [voteManagement],
        campaignPromise: {type: String,default: null},
        petitionStatus: {type: String, enum: ["accepted","rejected","under review","has not submitted"], default: "has not submitted"}

    },
    { timestamps: true }
)

module.exports = mongoose.model("Client", politicalUser)

const mongoose = require("mongoose")


const partyPositions = mongoose.Schema(
    {
        positions: {type:String,},
        dateInOffice: {type: String},
        dateOfficeWasCreated: {type: String, default: "1958-10-20"},
        candidateName: {type: mongoose.Schema.Types.ObjectId, ref:'Client', required: true}
    }
)

const runningCandidates = mongoose.Schema({
    contestingPosition: {type: String, required:true},
    totalVotes: {type: Number, default: 0},
    candidateID: {type: mongoose.Schema.Types.ObjectId, ref:'Client', required: true},
    status: {type: String, enum: ['loser','winner','contesting'], default: 'loser'},
    duration: {type: String, required: true},
    satisfied: {type: Boolean, default: true},
    petition: { type:String},
    politicalAgenda: {type: String}
})

const dominatingPosition = mongoose.Schema({
    contestingPosition: {type: String, required:true},
    candidateID: {type: mongoose.Schema.Types.ObjectId, ref:'Client', required: true},
    duration: {type: String, required: true}
})

const politicalParty = mongoose.Schema(
    {
        partyName: {type:String , required: true},
        partyLogo: {type:String , required: true},
        partyCreator: {type: mongoose.Schema.Types.ObjectId, ref:'Client', required: true},
        partyShortName: {type:String, minlength: 2, maxlength: 3},
        status: {type: String, enum: ['contesting','winner','not contesting'], default: 'not contesting'},
        partyCandidates: [runningCandidates],
        partyPositions: [dominatingPosition],

    },
    { timestamps: true }
)



module.exports = mongoose.model("Party", politicalParty)
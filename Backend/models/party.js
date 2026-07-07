const mongoose = require("mongoose")


const runningCandidates = new mongoose.Schema({
    contestingPosition: {type:mongoose.Schema.Types.ObjectId, ref:'Office'},
    candidateID: {type: mongoose.Schema.Types.ObjectId, ref:'Client', required: true},
    satisfied: {type: Boolean, default: true},
    petition: { type:String},
    politicalAgenda: {type: String}
})

const dominatingPosition = new mongoose.Schema({
    Positions: {type: mongoose.Schema.Types.ObjectId, ref:'Office', required: true},
})

const politicalParty = new mongoose.Schema(
    {
        partyName: {type:String , required: true},
        hqAddress: {type:String, required: true},
        partyCreator: {type: mongoose.Schema.Types.ObjectId, ref:'Client'},
        partyShortName: {type:String, minlength: 2, maxlength: 3},
        partyCandidates: [runningCandidates],
        partyPositions: [dominatingPosition],
        partyColor: {type:String,required: true},
        partySlogan: {type: String, required: true,minlength: 3, maxlength: 1000},
        partyMotto: {type: String, required: true,minlength: 3, maxlength: 1000}
    },
    { timestamps: true }
)



module.exports = mongoose.model("Party", politicalParty)
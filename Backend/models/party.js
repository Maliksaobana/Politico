const mongoose = require("mongoose")


const partyPoliticalCandidates = new mongoose.Schema({
    contestingPosition: {type:mongoose.Schema.Types.ObjectId, ref:'Office'},
    candidateID: {type: mongoose.Schema.Types.ObjectId, ref:'Client', required: true},
    satisfied: {type: Boolean, default: true},
    petition: { type:String},
    politicalAgenda: {type: String}
})

const partyHeldPositions = new mongoose.Schema({
    Positions: {type: mongoose.Schema.Types.ObjectId, ref:'Office', required: true},
})

// this model create a political party

const politicalParty = new mongoose.Schema(
    {
        partyName: {type:String , required: true,unique:true},
        hqAddress: {type:String, required: true},
        partyShortName: {type:String, minlength: 2, maxlength: 10,unique:true},
        partyCandidates: [partyPoliticalCandidates],
        partyPositions: [partyHeldPositions],
        partyColor: {type:String,required: true},
        partySlogan: {type: String, required: true,minlength: 3, maxlength: 1000},
        partyMotto: {type: String, required: true,minlength: 3, maxlength: 1000}
    },
    { timestamps: true }
)



const Party = mongoose.model("Party", politicalParty)

module.exports = {
    Party
}
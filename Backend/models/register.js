const mongoose = require("mongoose")

const registerCandidate = new mongoose.Schema({
    positionID: {type: mongoose.Schema.Types.ObjectId,ref:"Office"},
    candidateId: {type: mongoose.Schema.Types.ObjectId,ref:"Client"},
    party: {type: mongoose.Schema.Types.ObjectId,ref:"Party"},
    campaignPromise: {type:String,required:true},
    isAccepted: {type:Boolean,default:false}
})


module.exports = mongoose.model("Candidate",registerCandidate)
const mongoose = require("mongoose");

const petition = new mongoose.Schema({
    whoMadePetition: {type: mongoose.Schema.Types.ObjectId, ref:'Client'},
    onWhichParty: {type: mongoose.Schema.Types.ObjectId, ref:'Party'},
    onWhichPosition: {type: mongoose.Schema.Types.ObjectId, ref:'Office'},
    onWhichCandidate: {type: mongoose.Schema.Types.ObjectId, ref:'Client'},
    onWhichVote: {type: mongoose.Schema.Types.ObjectId, ref:'Vote'},
    petitionFeedBack: {type:Boolean, default: false},
    reasonForPetition: {type:String, default: null,required: true},
},
    {timestamps: true}
)

module.exports = mongoose.model("Petition", petition)
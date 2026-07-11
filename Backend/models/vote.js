const mongoose = require("mongoose")


const vote = new mongoose.Schema(
    {
        candidate: {type: mongoose.Schema.Types.ObjectId,ref: "Candidate"},
        candidateID: {type: mongoose.Schema.Types.ObjectId,ref: "Client"},
        positionID: {type: mongoose.Schema.Types.ObjectId,ref: "Office"},
        partyID: {type: mongoose.Schema.Types.ObjectId,ref: "Party"},
        totalVotes: {type: Number, default: 0},
        status: {type: String, enum: ['winner','contesting'], default: 'contesting'},
    },
    { timestamps: true }
)

module.exports = mongoose.model("Vote", vote)
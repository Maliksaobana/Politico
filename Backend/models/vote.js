const mongoose = require("mongoose")


const vote = new mongoose.Schema(
    {
        name: { type: mongoose.Schema.Types.ObjectId, ref:'Client'},
        party: {type:mongoose.Schema.Types.ObjectId, ref:'Party'},
        office: {type: mongoose.Schema.Types.ObjectId, ref:'Office', required: true},
        totalVotes: {type: Number, default: 0},
        status: {type: String, enum: ['loser','winner','contesting'], default: 'contesting'},
    },
    { timestamps: true }
)

module.exports = mongoose.model("Vote", vote)
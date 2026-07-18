const mongoose = require("mongoose")

const politicoWinners = new mongoose.Schema(
    {
        officeContesting : {type: mongoose.Schema.Types.ObjectId, ref:'Office'},
        candidateContesting: {type: mongoose.Schema.Types.ObjectId, ref:'Client'},
        party: {type: mongoose.Schema.Types.ObjectId, ref:'Party'},
        declaredWinner: {type:Boolean, default: false}
    },
    {timestamps: true}
)

module.exports = mongoose.model("Winner", politicoWinners)
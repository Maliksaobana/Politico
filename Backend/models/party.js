const mongoose = require("mongoose")


const Votes = mongoose.Schema(
    {
        votes: {type: Number, default: 0}
    }
)

const partyPositions = mongoose.Schema(
    {
        positions: {type:String,},
        dateInOffice: {type: String},
        dateOfficeWasCreated: {type: String, default: "1958-10-20"}
    }
)

const politicalParty = mongoose.Schema(
    {
        partyName: {type:String , required: true},
        partyLogo: {type:String , required: true},
        partyCreator: {type:String , required: true},
        partyShortName: {type:String, minlength: 2, maxlength: 3},
        partyCandidates: [{type: mongoose.Schema.Types.ObjectId, ref:'Client'}],
        partyPositions: [{type: String}],
        totalVotes: {Votes},
        duration: {type: String, required: true}

    },
    { timestamps: true }
)



module.exports = mongoose.model("Party", politicalParty)
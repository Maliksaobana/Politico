const mongoose = require("mongoose")

const participation = new mongoose.Schema({
    officeVotedFor: {type: mongoose.Schema.Types.ObjectId,ref:"Office"},
    candidatedVotedFor: {type: mongoose.Schema.Types.ObjectId, ref: "Client"}
})

const politicalUser = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        party: {type:mongoose.Schema.Types.ObjectId, ref:'Party',default:null}, // get party id and populate with party name, shortname, role, motto and slogan
        role: { type: String, enum: ['member','admin',"politician"], default: 'member' },
        hasAParty: { type: Boolean, default: false },
        votedParticipatedOn: [participation],
    },
    { timestamps: true }
)

module.exports = mongoose.model("Client", politicalUser)

/*
    party: {
        id: party.id,
        partyname,
        partylogo,
        partyshortname,
        partyslogan,
        partymotto,
        partyhq
    }

*/
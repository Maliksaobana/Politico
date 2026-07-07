const mongoose = require("mongoose")


const politicalUser = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        party: { type: String, default: null },
        role: { type: String, enum: ['member','admin'], default: 'member' },
        // politicalPosition: { type: String, default: 'member'},
        // hasAParty: { type: Boolean, default: false },
        votedParty: [{}],
        votedCandidates: [{type: String}],
    },
    { timestamps: true }
)

module.exports = mongoose.model("Client", politicalUser)
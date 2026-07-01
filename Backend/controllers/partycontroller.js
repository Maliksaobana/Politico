// create a party
const createParty = async (req,res) => {
    try {
        const { id,
                nameOfParty,
                hqAddress,
                founder,
                partyColor,
                slogan,
                motto,
                creatorID } = req.body
    } catch (e) {
        res.status(400).json({err: '400',message: 'error creating party'})
    }
}
const createOffice = async (req,res) => {
    try {
        const { officeid, 
                createdOn,
                typeOfOffice, 
                nameOfOffice,
                roleOfOffice, 
                creator } = req.body
    } catch (e) {
        res.status(400).json({err: '400',message: 'error creating party'})
    }
}

const getAllParty = async (req,res) => {
    try {
        res.send('all party')
    } catch (e) {
        res.status(400).json({err: '400',message:'error fetching party'})
    }
}

const getAllPoliticalOffice = async (req,res) => {}

const getSpecificParty = async (req,res) => {}

const getSpecificPoliticalOffice = async (req,res) => {}

const vote = async (req,res) => {
    try {
        const { positionID,
                votersID,
                position,
                candidate,
                partyID,
                partyName,
                hasVoted } = req.body
    } catch (e) {
        res.status(400).json({message: "couldn't place vote"})
    }
}


const editAParty = async (req,res) => {}

const deleteAParty = async (req,res) => {}

module.exports = {
    createParty,
    createOffice,
    getAllParty,
    getAllPoliticalOffice,
    getSpecificParty,
    getSpecificPoliticalOffice,
    vote,
    editAParty,
    deleteAParty
}
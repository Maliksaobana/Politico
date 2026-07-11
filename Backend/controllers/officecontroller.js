require('dotenv').config()

const Office = require("../models/office")
const User = require("../models/user")

// the office route is going to do 

/*
    **one: it is going to get total offices vacant or not
    **two: it will get the list of people that occupy those offices
    **three: it will update the office route and declare a winner for the office
    **four: store the list of all occupants and there duration
*/


const createOffice = async (req,res) => {
    try {
        let { 
                officeName,
                officeRole, 
                officeLevel,
                officeArm,
                officeDescription} = req.body

        const findIfOfficeExist = await Office.findOne({officeName})

        let arm = 'legislative'
        let level = "local level"

        if(officeArm === '') {
            officeArm = arm
        }

        if(officeLevel === '') {
            officeLevel =  level 
        }

        if(findIfOfficeExist && findIfOfficeExist.officeLevel === officeLevel) {
            res.status(400).json({status:400,message:'no same office can exist on the same level'})
            throw new Error("review office level")
        }

        const newOffice = await Office.create({
            officeArm: arm,
            officeLevel: level,
            officeDescription,
            officeName,
            officeRole
        })

        res.status(200).json({
            status: 200,
            body: {
                officeId: newOffice._id,
                officeArm: newOffice.officeArm,
                officeLevel: newOffice.officeLevel,
                officeDescription: newOffice.officeDescription,
                officeName: newOffice.officeName,
                officeRole: newOffice.officeRole
            }
        })
    } catch (e) {
        res.status(400).json({err: '400',message:e.message})
    }
}

const getAllPoliticalOffice = async (req,res) => {
    try {
        const getOffices = await Office.find()

        if(getOffices.length < 0 || !getOffices) {
            res.status(400).json({status:400,message:"no office created"})
            throw new Error("no office available")
        }

        res.status(200).json({
            status: 200,
            body: getOffices
        })
    } catch (e) {
        res.status(400).json({
            status: 400,
            message: e.message
        })
    }
}

const getSpecificPoliticalOffice = async (req,res) => {
    try {
        const checkOffice = await Office.findById(req.params.id)

        if(!checkOffice) {
            res.status(400).json({status:400,message:"no such office found"})
            throw new Error("error getting office. check details")
        }

        res.json({
            status:200,
            body: checkOffice
        })
    } catch (e) {
        res.status(400).json({
            status:400,
            message: e.message
        })
    }
}

const editSpecificPoliticalOffice = async (req,res) => {
    try {

        const newEntry = req.body

        const editOffice = await Office.findById(req.params.id)

        if(!editOffice) {
            res.status(400).json({status:400,message:"no such office found"})
            throw new Error("error getting office. check details")
        }

        for(let key in newEntry) {
            if(editOffice[key] !== undefined) {
                editOffice[key] = newEntry[key]
            }
        }

        await editOffice.save()

        res.status(200).json({
            status:200,
            body: editOffice
        })
    } catch (e) {
        res.status(400).json({
            status:400,
            message: e.message
        })
    }
}

const deleteOffice = async (req,res) => {
    try {
        const officeToDelete = await Office.findById(req.params.id)

        if(!officeToDelete) {
            res.status(400).json({status:400,message:"can't find office. check details"})
            throw new Error('error getting office. check details and try again')
        }

        await Office.deleteOne(officeToDelete)

        res.status(200).json({
            status: 200,
            body: await Office.find()
        })
    } catch (e) {
        res.status(400).json({
            status: 400,
            message: e.message
        })
    }
}

module.exports = {
    createOffice,
    getAllPoliticalOffice,
    getSpecificPoliticalOffice,
    deleteOffice,
    editSpecificPoliticalOffice
}
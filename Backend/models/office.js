const mongoose = require("mongoose")





const politicalOffice = new mongoose.Schema(
    {
        officeName: {type:String, required:true},
        officeRole: {type:String,minlength: 5, maxlength: 1000, required:true},
        officeLevel: {type:String,enum:["federal level","state level","local level"], default:'local level', required:true},
        officeArm: {type:String,enum:["judiciary","legislative","executive"], default:'legislative', required:true},
        officeDescription: {type: String, minlength: 5, maxlength: 1000, required:true},
        isVancant: {type:Boolean, default:true},
        currentOccupant: {type:mongoose.Schema.Types.ObjectId, ref:'Client',default:null},
        officeContestantStatus: {type:mongoose.Schema.Types.ObjectId, ref:'Vote'},
        currentParty: {type:mongoose.Schema.Types.ObjectId, ref:'Party',default:null},
    },
    {timestamps:true}
)

module.exports = mongoose.model("Office",politicalOffice)

/* once winner is declared 
    1 isVancant becomes false
    2 the current occupant name will show
    3 the party will also be included
    4 might run filter on the front end

*/
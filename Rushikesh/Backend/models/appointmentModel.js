
let mongoose=require("mongoose")

let appointmentSchema=mongoose.Schema({
    pet_type:{
        type:String,
        default:null
    },
    pet_gender:{
        type:String,
        default:null
    },
    meetiing_id:{
        type:String
    },
    meeting_time:{
        type:String,
    },
    doctor_id:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    },
    user_id:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        default:null
    }
})

const appointmentModel=mongoose.model("appointmentMOdel",appointmentSchema)

module.exports={appointmentModel}
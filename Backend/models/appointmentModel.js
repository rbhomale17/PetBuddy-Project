
let mongoose = require("mongoose")

let appointmentSchema = mongoose.Schema({
    pet_type: {
        type: String,
        default: null
    },
    pet_gender: {
        type: String,
        default: null
    },
    meeting_link: {
        type: String
    },
    meeting_time: {
        type: String,
    },
    doctor_id: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        default: null
    },
    status: { type: Boolean, default: false, enum: [true, false] }
})

const appointmentModel = mongoose.model("appointment", appointmentSchema)

module.exports = { appointmentModel }
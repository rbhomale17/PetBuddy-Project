// const { Binary } = require("mongodb");
const mongoose = require("mongoose")

// const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number },
    role: { type: String, required: true, enum: ["Customer", "Admin", "Doctor"] },
    password: { type: String },
    picture: { type: Object },
    address: { type: String },
    language: { type: String },
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "appointment" }],
    specialization: {
        type: String, 
        enum: [
            "Veterinary Nutrition",
            "Veterinary Pathology",
            "Veterinary Sports Animals",
            "Veterinary Behaviorists",
            "Veterinary Dentistry",
            "Veterinary Dermatology"
        ]
    },
}, {
    versionKey: false
})

const UserModel = mongoose.model("user", userSchema)

module.exports = { UserModel };
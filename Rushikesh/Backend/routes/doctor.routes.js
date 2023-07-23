let express = require("express")

let doctorroute = express.Router()
let { UserModel } = require("../models/user.model")
let { appointmentModel } = require("../models/appointmentModel")
const { v4: uuidv4 } = require('uuid');
const { sendAppointmentConfirmationMail } = require("./mail.router");



doctorroute.get("/", async (req, res) => {

    try {
        let doctorlist = await UserModel.find({ role: "Doctor" })
        res.status(200).send({
            "msg": "successfully fetched",
            "data": doctorlist
        })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

doctorroute.get("/findDoctor", async (req, res) => {
    let { search } = req.query
    try {
        let data = await UserModel.find({
            role: "Doctor",

            $or: [{ name: { $regex: search, $options: "i" } },
            { language: { $regex: search, $options: "i" } }, {
                specialization: { $regex: search, $options: "i" }
            }]
        })
        res.status(200).send({
            "msg": "successfully fetched",
            "data": data
        })

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

// slot creating endpoint for Doctor
doctorroute.post("/addappointment", async (req, res) => {
    try {
        // doctoID = "64ba719e180910c5986009dc"
        let { meeting_time, doctor_id } = req.body
        let data = new appointmentModel({
            meeting_time, doctor_id,
            meeting_link: `https://nxm201-video-server.onrender.com/${uuidv4()}`,
        })
        await data.save()

        let user = await UserModel.findById(doctor_id);
        console.log(user);
        user.appointments.push(data._id)
        await UserModel.findByIdAndUpdate(doctor_id, user)

        res.status(200).send({
            "msg": "Slot Created Successfully",
            "data": user
        })


    } catch (error) {
        res.status(400).send({ "msg": error.message })
        console.log(error)
    }
})

// slot booking endpoint for user
doctorroute.post("/addUserToAppointment", async (req, res) => {
    try {
        // user_id = "64b9287a379c66fe435d9448"
        let { pet_type, pet_gender, user_id, appointment_id } = req.body
        let data = await appointmentModel.findByIdAndUpdate(appointment_id, {
            pet_type,
            pet_gender,
            user_id,
            status: true
        })

        let user = await UserModel.findById(user_id);
        user.appointments.push(appointment_id)
        await UserModel.findByIdAndUpdate(user_id, user)

        let details = await UserModel.findById(user_id)
            .populate({
                path: 'appointments',
                populate: {
                    path: 'doctor_id',
                    model: 'user'
                }
            });
        sendAppointmentConfirmationMail(details, details.appointments[details.appointments.length - 1].doctor_id)
        res.status(200).send({
            "msg": "Slot Booked Successfully",
            "data": user
        })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
        console.log(error)
    }
})

// get all appointment related to user (all users)
doctorroute.get("/appointments", async (req, res) => {
    try {
        // https://petbuddy-main-server.onrender.com/doctor/appointments?id=
        const { id } = req.query
        // let doctoID = "64ba719e180910c5986009dc"
        let data = await UserModel.findById(id).populate('appointments')//.populate('doctor_id')
        res.status(200).send({
            "msg": "successfully fetched",
            "data": data
        })

    } catch (error) {
        res.status(400).send({ "msg": error.message })
        console.log(error)
    }
})

doctorroute.get("/userAppointments", async (req, res) => {
    try {
        // https://petbuddy-main-server.onrender.com/doctor/appointments?id=
        const { id } = req.query
        // let doctoID = "64ba719e180910c5986009dc"
        // let data = await UserModel.findById(id).populate('appointments').populate('doctor_id')
        let data = await UserModel.findById(id)
            .populate({
                path: 'appointments',
                populate: {
                    path: 'doctor_id',
                    model: 'user'
                }
            })
        res.status(200).send({
            "msg": "successfully fetched",
            "data": data
        })

    } catch (error) {
        res.status(400).send({ "msg": error.message })
        console.log(error)
    }
})


module.exports = { doctorroute }





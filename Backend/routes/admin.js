let express = require("express")

let adminroute = express.Router()
let { UserModel } = require("../models/user.model")
let { authorise } = require("../middlewares/authorisation")
let { authentication } = require("../middlewares/authentication")

adminroute.post("/addDoctor", async (req, res) => {

    try {
        let data = new UserModel(req.body)
        await data.save()
        res.status(400).send({ "msg": "new doctor added" })

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

module.exports = { adminroute }
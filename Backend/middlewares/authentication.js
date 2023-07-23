jwt = require("jsonwebtoken")

require("dotenv").config()

const { UserModel } = require("../models/user.model")

let authentication = (async (req, res, next) => {
    try {
        let token = req.headers.authorization
        let decoded = jwt.verify(token, process.env.RerefreshToken)
        if (decoded) {
            let { userID, userRole } = decoded
            req.role = userRole
            next()
        }
        else {
            res.status(400).send({ "message": "you need to login" })
        }



    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})


module.exports = { authentication }
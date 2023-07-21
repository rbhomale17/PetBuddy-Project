
require('dotenv').config();
const bcrypt = require("bcrypt");
const { UserModel } = require('../models/user.model');
const saltRounds = Number(process.env.saltRounds);


const registrationMiddleware = async (req, res, next) => {
    try {
        const { email,password} = req.body;
        console.log(req.body)
        const emailUser = await UserModel.find({email}); 
        console.log(emailUser)
        if (emailUser.length !== 0) res.send({ msg: "This Email is already registered. Try Log in", err: false })
        else {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                // hash is hashed password.
                if (err) {
                    console.log(err);
                    res.send({ err: err.message, err: false });
                    return;
                }
                req.body.password = hash;
                next();
            });
        }
    } catch (error) {
        res.send({ err: error.message});
    }
};

module.exports = { registrationMiddleware }
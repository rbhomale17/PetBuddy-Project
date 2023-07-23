const express = require("express");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { registrationMiddleware } = require("../middlewares/registration.middleware");
const { loginMiddleware } = require("../middlewares/login.middleware");
// const { use } = require("passport");
const { appointmentModel } = require("../models/appointmentModel");

require('dotenv').config();
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    // console.log(1);
    const { page, limit, search } = req.query;
    if (search) {
        if (page && limit) {
            let skipped = (+limit * +page) - +limit;
            // console.log(skipped)
            let users = await UserModel.find({ name: { $regex: search, $options: 'i' } }).skip(skipped).limit(limit);
            res.send({ users: users });
        } else {
            let users = await UserModel.find({ name: { $regex: search, $options: 'i' } });
            res.send({ users: users });
        }
    } else {
        if (page && limit) {
            let skipped = (+limit * +page) - +limit;
            // console.log(skipped)
            let users = await UserModel.find().skip(skipped).limit(limit);
            res.send({ users: users });
        } else {
            let users = await UserModel.find();
            res.send({ users: users });
        }
    }
})

// user registration thing are working here
userRouter.post("/register", registrationMiddleware, async (req, res) => {
    try {
        // let { gender } = req.body;
        // if (gender == 'Male') req.body.picture = `https://meeteasy-main-server.onrender.com/photos/files/648b63ba14f251ce9c8679c2`;
        // else {
        //     req.body.picture = `https://meeteasy-main-server.onrender.com/photos/files/648b63c014f251ce9c8679c3`;
        // }
        const user = new UserModel(req.body);
        await user.save();
        // console.log(user);
        user.password = undefined;
        res.send({ msg: `Welcome!, ${req.body.name} Your Registration is Successfully.`, user })
    } catch (error) {
        res.send({ err: error.message })
    }
});

// login route 
userRouter.post("/login", loginMiddleware, async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserModel.findOne({ email })
        const accessToken = jwt.sign({
            userID: user._id, userRole: user.role,
            userName: user.name, userImage: user.picture
        }, process.env.AccessToken, { expiresIn: '24h' }) //{ expiresIn: 60*60*4 } for foour hour

        const refreshToken = jwt.sign({
            userID: user._id, userRole: user.role,
            userName: user.name, userImage: user.picture
        }, process.env.RerefreshToken, { expiresIn: '7d' }) //{ expiresIn: 60*60*4 } for foour hour

        user.password = undefined;
        res.send({
            msg: `Welcome!, ${user.name} Your Login is Successfully.`,
            accessToken, refreshToken,
            user
        })
    } catch (error) {
        res.send({ err: error.message })
    }
});


userRouter.patch("/update", async (req, res) => {
    const { userID } = req.body;
    try {
        await UserModel.findByIdAndUpdate(userID, req.body);
        res.send({ msg: `Details are Updated Successfully.` })
    } catch (error) {
        res.send({ err: error.message })
    }
});

userRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    let user = await UserModel.findById(id);
    try {
        if (user) {
            let DeleteUser = await UserModel.findByIdAndDelete(id);
            // console.log(DeleteUser);
            res.send({ msg: `${user.name}'s Account is Deleted Successfully.`, Deleted_User: DeleteUser })
        } else {
            res.send({ msg: "Invalid User ID, User Not Found!" })
        }
    } catch (error) {
        res.send({ err: error.message })
    }
});





module.exports = { userRouter }
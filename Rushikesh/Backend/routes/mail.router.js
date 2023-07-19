const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { UserModel } = require('../models/user.model');
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.saltRounds);

const MailRouter = express.Router();

// Create a transporter object using your email service credentials
const transporter = nodemailer.createTransport({
    service: process.env.NodemailerService, //|| 'gmail',
    auth: {
        user: process.env.NodemailerAuthUser,
        pass: process.env.NodemailerAuthPassword,
    },
});

// Store temporary reset tokens in memory (you should use a database in production)
const tokenStore = {};

// Generate a temporary reset token with a 10-minute expiry
function generateResetToken(email) {
    const token = crypto.randomBytes(20).toString('hex');
    const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    tokenStore[email] = { token, expiry };
    return token;
}

// Send the password reset email with the temporary reset token
async function sendPasswordResetEmail(email, token, user) {
    const resetUrl = `http://127.0.0.1:5500/Rushikesh/Frontend/resetPassword.html?token=${token}&email=${email}&userID=${user._id}`;

    const mailOptions = {
        from: process.env.NodemailerServiceMail,
        to: email,
        subject: 'Password Reset for PetBuddy+ account',
        html: `
        <html>
            <body>
            <p>Hii ${user.name}</p>
            <p>You've recently made a request to reset your password on the PetBuddy+ Platform.</p>
            <p>Click on the following link to reset your password: <a href="${resetUrl}">Click Here</a>.</p>
            </body>
        </html>
        `
        // Click on the following link to reset your password: ${resetUrl}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Password reset email sent:', info.response);
        }
    });
}

// Handle the "Forgot Password" request
MailRouter.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    // let email = 'rbhomale17@gmail.com'
    let user = await UserModel.findOne({ email });
    // checking if user if present or not in DB
    if (!user) {
        res.send({ msg: 'User Not Found!' })
        return
    }
    // Generate a reset token and send the email
    const token = generateResetToken(email);
    sendPasswordResetEmail(email, token, user);

    res.send({ msg: 'Email for password reset is sent on your register email.' });
});

// Update the password
MailRouter.post('/reset-password', async (req, res) => {
    var { token, password, email, userID } = req.body;
    var storedToken = tokenStore[email];
    // console.log({ token, password, email, userID })
    // console.log(storedToken,storedToken.expiry > Date.now());
    // Verify if the token exists and is still valid
    if (storedToken && storedToken.token == token && storedToken.expiry > Date.now()) {
        // Update the password in your database
        bcrypt.hash(password, saltRounds, (err, hash) => {
            // hash is hashed password.
            if (err) {
                console.log(err);
                res.send({ err: err.message, err: false });
                return;
            }
            password = hash;
        })
        await UserModel.findByIdAndUpdate({ _id: userID }, password)
        // Remove the token from the token store
        delete tokenStore[email];

        res.send({msg:'Password reset successfully.'});
    } else {
        res.send({msg:'Link is Expired, Please Try Again.'});
    }
});

module.exports = MailRouter;
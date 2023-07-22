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
        user: process.env.NodemailerAuthUser, // email
        pass: process.env.NodemailerAuthPassword, // App Password
    },
});

// Store temporary reset tokens in memory
const tokenStore = {}; // for normal registration
// Store temporary reset tokens in memory 
const tokenStoreOauth = {}; // for Oauth registration

// Generate a temporary reset token with a 10-minute expiry
function generateResetToken(email) {
    const token = crypto.randomBytes(20).toString('hex');
    const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    tokenStore[email] = { token, expiry };
    return token;
}

// Send the password reset email with the temporary reset token
async function sendPasswordResetEmail(email, token, user) {
    const resetUrl = `http://127.0.0.1:5500/Rushikesh/Frontend/resetPasswordforGoogle.html?token=${token}&email=${email}&userID=${user._id}`;

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
            <p>This link is only Valid for 10 minutes & for one time use only.</p>
            
            <p>Best regards,</p>
            <p>The PetBuddy+ Team</p>
            </body>
        </html>
        `
        // Click on the following link to reset your password: ${resetUrl}`,
    };

    // sending mail via nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Password reset email sent:', info.response);
        }
    });
}

// send the welcome email to user for normal registration
async function sendWelcomeEmail(email, user) {
    const appUrl = `http://127.0.0.1:5500/Rushikesh/Frontend/signup.html`;

    if (user.role !== "Doctor" && user.role !== "Admin") {
        const welcomeMail = {
            from: process.env.NodemailerServiceMail,
            to: email,
            subject: 'Welcome to PetBuddy+ - Your Pet Care Companion 🐾',
            html: `
        <html>


        <head>
            <title>Welcome to PetBuddy+</title>
        </head>
    
        <body>
            <div style="background-color: #cdfad69d; padding: 20px;">
                <h1 style="color: #ff8c00;">Welcome to PetBuddy+</h1>
                <p>Dear ${user.name},</p>
                <!-- <br> -->
                <p>Welcome to PetBuddy+! We are excited to have you as a part of our community.</p>
                <p>At PetBuddy+, we strive to provide the best care for your pets. Our dedicated team of veterinarians and
                    pet care specialists are here to assist you with any pet-related concerns.</p>
                <!-- <br> -->
                <p>Click to explore our application: <a href="${appUrl}">Click Here</a>.</p>
                <p>Feel free to explore our app and discover various features such as: </p>
                <ul>
                    <li>Booking appointments with our veterinarians</li>
                    <li>Tracking your pet's health records</li>
                    <li>Connecting with other pet owners</li>
                    <li>Accessing helpful pet care articles and tips</li>
                </ul>
                <!-- <br> -->
                <p>If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
                <p>Thank you for choosing PetBuddy+ for your pet care needs.</p>
                <!-- <br> -->
                <p>Best regards,</p>
                <p>The PetBuddy+ Team</p>
                <hr style="border: 1px solid #ccc;">
                <p style="color: #999;">If you did not sign up for PetBuddy+, please ignore this email.</p>
            </div>
        </body>
    
        </html>
        `
        };

        // sending mail via nodemailer
        transporter.sendMail(welcomeMail, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Password reset email sent:', info.response);
            }
        });

    } else if (user.role !== "Customer" && user.role !== "Admin") {

        const welcomeMail = {
            from: process.env.NodemailerServiceMail,
            to: email,
            subject: 'Welcome to PetBuddy+ - Your Pet Care Companion 🐾',
            html: `
            <html>
    
            <head>
                <title>Welcome to PetBuddy+</title>
            </head>
        
            <body>
                <div style="background-color: #cdfad69d; padding: 20px;">
                    <h1 style="color: #ff8c00;">Welcome to PetBuddy+</h1>
                    <p>Dear Dr. ${user.name},</p>
                    <!-- <br> -->
                    <p>Welcome to PetBuddy+! We are excited to have you as a part of our team of veterinarian's.</p>
                    <p>At PetBuddy+, we strive to provide the best care for our customers pets. Our dedicated team of veterinarians and
                        pet care specialists are welcomes you and here to assist you with any pet-related concerns.</p>
                    <!-- <br> -->
                    <p>Click to explore our application: <a href="${appUrl}">Click Here</a>.</p>
                    <p>Feel free to explore our app and discover various features such as: </p>
                    <ul>
                        <li>Booking appointments with our veterinarians</li>
                        <li>Creating appointments for our customers</li>
                        <li>Tracking pet's health records</li>
                        <li>Connecting with other pet owners</li>
                    </ul>
                    <!-- <br> -->
                    <p>If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
                    <p>Thank you for choosing PetBuddy+.</p>
                    <!-- <br> -->
                    <p>Best regards,</p>
                    <p>The PetBuddy+ Admin Team</p>
                    <hr style="border: 1px solid #ccc;">
                    <p style="color: #999;">If you did not sign up for PetBuddy+, please ignore this email.</p>
                </div>
            </body>
        
            </html>
            `
        };

        // sending mail via nodemailer
        transporter.sendMail(welcomeMail, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Password reset email sent:', info.response);
            }
        });
    } else if (user.role !== "Customer" && user.role !== "Doctor") {

        const welcomeMail = {
            from: process.env.NodemailerServiceMail,
            to: email,
            subject: 'Welcome to PetBuddy+ - Your Pet Care Companion 🐾',
            html: `
            <html>
    
            <head>
                <title>Welcome to PetBuddy+</title>
            </head>
        
            <body>
                <div style="background-color: #cdfad69d; padding: 20px;">
                    <h1 style="color: #ff8c00;">Welcome to PetBuddy+</h1>
                    <p>Dear Dr. ${user.name},</p>
                    <!-- <br> -->
                    <p>Welcome to PetBuddy+! We are excited to have you as a part of our team of Admins.</p>
                    <p>At PetBuddy+, we strive to provide the best care for our customers pets. Our dedicated team of veterinarians, Admins and
                        pet care specialists are welcomes you and here to assist you.</p>
                    <!-- <br> -->
                    <p>Click to explore our application: <a href="${appUrl}">Click Here</a>.</p>
                    <p>Feel free to explore our app and discover various features such as: </p>
                    <ul>
                        <li>Booking appointments with our veterinarians</li>
                        <li>Creating appointments for our customers</li>
                        <li>Tracking pet's health records</li>
                        <li>Connecting with other pet owners</li>
                    </ul>
                    <!-- <br> -->
                    <p>If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
                    <p>Thank you for choosing PetBuddy+.</p>
                    <!-- <br> -->
                    <p>Best regards,</p>
                    <p>The PetBuddy+ Admin Team</p>
                    <hr style="border: 1px solid #ccc;">
                    <p style="color: #999;">If you did not sign up for PetBuddy+, please ignore this email.</p>
                </div>
            </body>
        
            </html>
            `
        };

        // sending mail via nodemailer
        transporter.sendMail(welcomeMail, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Password reset email sent:', info.response);
            }
        });
    }
}

// send the welcome email to user on Google Oauth registration
async function sendWelcomeFromGoogleOauthEmail(email, user) {
    const token = crypto.randomBytes(20).toString('hex');
    const expiry = Date.now() + 3 * 24 * 60 * 60 * 1000; // 3 Days
    tokenStoreOauth[email] = { token, expiry };

    const resetUrl = `http://127.0.0.1:5500/Rushikesh/Frontend/resetPasswordforGoogle.html?token=${token}&email=${email}&userID=${user._id}`;
    const appUrl = `http://127.0.0.1:5500/Rushikesh/Frontend/landing.html`
    const passwordMobileReset = {
        from: process.env.NodemailerServiceMail,
        to: email,
        subject: 'Welcome to PetBuddy+ - Your Pet Care Companion 🐾',
        html: `
        <html>

        <head>
            <title>Welcome to PetBuddy+</title>
        </head>
    
        <body>
            <div style="background-color: #cdfad69d; padding: 20px;">
                <h1 style="color: #ff8c00;">Welcome to PetBuddy+</h1>
                <p>Dear ${user.name},</p>
                <!-- <br> -->
                <p>Welcome to PetBuddy+! We are excited to have you as a part of our community.</p>
                <p>At PetBuddy+, we strive to provide the best care for your pets. Our dedicated team of veterinarians and
                    pet care specialists are here to assist you with any pet-related concerns.</p>
                <!-- <br> -->                
                <p>Click to explore our application: <a href="${appUrl}">Click Here</a>.</p>
                <p>Feel free to explore our app and discover various features such as: </p>
                <ul>
                    <li>Booking appointments with our veterinarians</li>
                    <li>Tracking your pet's health records</li>
                    <li>Connecting with other pet owners</li>
                    <li>Accessing helpful pet care articles and tips</li>
                </ul>
                <!-- <br> -->
                <p>You have Successfully Completed Your Registration by Google. Please Click on this link to change your password:
                <a href="${resetUrl}">Click Here</a>.</p>
                <h6>Password reset link is valid for 3 days & for one time use only.</h6>
                <p>If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
                <p>Thank you for choosing PetBuddy+ for your pet care needs.</p>
                <!-- <br> -->
                <p>Best regards,</p>
                <p>The PetBuddy+ Team</p>
                <hr style="border: 1px solid #ccc;">
                <p style="color: #999;">If you did not sign up for PetBuddy+, please ignore this email.</p>
            </div>
        </body>
    
        </html>
        `
    };

    // sending mail via nodemailer
    transporter.sendMail(passwordMobileReset, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Password reset email sent:', info.response);
        }
    });
}

// Handle the "Forgot Password" request from signup/login form
MailRouter.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    // let email = 'rbhomale17@gmail.com'
    let user = await UserModel.findOne({ email });
    // checking if user if present or not in DB
    if (!user) {
        res.send({ msg: 'User Not Found!' })
        return;
    }
    // Generate a reset token and send the email
    const token = generateResetToken(email);
    sendPasswordResetEmail(email, token, user);

    res.send({ msg: 'Email for password reset is sent on your register email.' });
});

// Update the password after reset by user
MailRouter.post('/reset-password', async (req, res) => {
    var { token, password, email, userID } = req.body;
    var storedToken = tokenStore[email];

    // Verify if the token exists and is still valid
    if (storedToken && storedToken.token == token && storedToken.expiry > Date.now()) {
        // Update the password in your database
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Update the password in the database
            await UserModel.findByIdAndUpdate(userID, { password: hashedPassword });

            // Remove the token from the token store
            delete tokenStore[email];

            res.send({ msg: 'Password reset successfully.' });
        } catch (err) {
            console.log(err);
            res.send({ msg: 'An error occurred while resetting the password.', error: true });
        }
    } else {
        res.send({ msg: 'Link is Expired, Please Try Again.' });
    }
});

// reseting password and adding mobile number for Oauth registering users
MailRouter.post('/reset-password-Oauth', async (req, res) => {
    var { token, password, email, userID, mobile } = req.body;
    var OauthStoredToken = tokenStoreOauth[email];

    // Verify if the token exists and is still valid
    if (OauthStoredToken && OauthStoredToken.token == token && OauthStoredToken.expiry > Date.now()) {
        // Update the password in your database
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Update the password in the database
            await UserModel.findByIdAndUpdate(userID, { password: hashedPassword, mobile });

            // Remove the token from the token store
            delete tokenStoreOauth[email];

            res.send({ msg: 'Password reset successfully.' });
        } catch (err) {
            console.log(err);
            res.send({ msg: 'An error occurred while resetting the password.', error: true });
        }
    } else {
        res.send({ msg: 'Link is Expired, Please Try Again.' });
    }
});

// Send mail when user register via form filling
MailRouter.post('/welcome-user', async (req, res) => {
    let { email } = req.body;
    // const { email } = req.body;
    // let email = 'rbhomale17@gmail.com'
    let user = await UserModel.findOne({ email });
    // checking if user if present or not in DB
    if (!user) {
        res.send({ msg: 'User Not Found!' })
        return;
    }
    sendWelcomeEmail(email, user);
    res.send({ msg: 'Welcome Email is sent on your register email.' });


})

// // exporting methods
module.exports = { MailRouter, sendWelcomeEmail, sendWelcomeFromGoogleOauthEmail };
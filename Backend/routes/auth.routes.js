const express = require("express");
const authRoute = express.Router();
const passport = require("passport");
const { UserModel } = require("../models/user.model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const { v4: uuidv4 } = require('uuid');
const { sendWelcomeFromGoogleOauthEmail } = require("./mail.router");

//google outh
authRoute.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile", "phone"] })
);
authRoute.get("/auth/google/callback", passport.authenticate('google', {
  // successRedirect: '/auth/google/success', failureRedirect: '/google/failure',
  session: false
}), async (req, res) => {
  let user = req.user;
  if (user) {
    user.password = undefined;
    // `https://meeteasy.netlify.app/landing.html?userdata=${encodeURIComponent(JSON.stringify(user))}`

    if (user.role !== 'Admin') res.redirect(`https://petbuddy.netlify.app/userdashbord?userdata=${encodeURIComponent(JSON.stringify(user))}`)
    else res.redirect(`https://petbuddy.netlify.app/admin/admindashboard?userdata=${encodeURIComponent(JSON.stringify(user))}`)
  } else {
    res.send('failed to connect')
  }
}
);

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
passport.use(

  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "https://petbuddy-main-server.onrender.com/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        let email = profile._json.email;
        // let mobile = profile._json.phone;
        let role = 'Customer';
        var user = await UserModel.findOne({ email })
        // console.log(user)
        if (user) {
          return done(null, user);
        } else {
          let name = profile._json.name;
          let picture = profile._json.picture.replace(96, 340);
          const user = new UserModel({ email, name, picture, role, password: uuidv4() });
          await user.save();
          sendWelcomeFromGoogleOauthEmail(email, user)
          return done(null, user);
        }
      } catch (error) {
        console.log(error)
        return done(error)
      }
    }
  )
);
module.exports = {
  authRoute
};

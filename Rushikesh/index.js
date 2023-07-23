
const express = require("express");
const CORS = require("cors");
const { photoRouter } = require("./Backend/routes/photos.router");
const { connection } = require("../Rushikesh/Backend/config/db");
const { userRouter } = require("../Rushikesh/Backend/routes/users.route");
const { authRoute } = require("./Backend/routes/auth.routes");
const path = require("path");
const cookieParser = require("cookie-parser");

const { MailRouter } = require("./Backend/routes/mail.router");

let { adminroute } = require("../Rushikesh/Backend/routes/admin");

let { doctorroute } = require("../Rushikesh/Backend/routes/doctor.routes");
let {
  appointmentModel,
} = require("../Rushikesh/Backend/models/appointmentModel");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(CORS());
app.use(cookieParser());

// const staticFilesDir = path.join(__dirname, 'frontEnd');

// Serve static files
// app.use(express.static(staticFilesDir));

// *************************
const cron = require("node-cron");
async function deleteAppointments() {
  try {
    // Delete appointments that match the condition (e.g., all appointments before the current date)
    const currentDate = new Date();
    await appointmentModel.deleteMany({ meeting_time: { $lt: currentDate } });
    await UserModel.updateMany({}, { $set: { appointments: [] } });
    console.log('Appointments deleted successfully.');
  } catch (err) {
    console.error('Error deleting appointments:', err);
  }
}

// Schedule the task to run at 12 AM daily
cron.schedule("0 0 * * *", () => {
  deleteAppointments();
});

app.get('/', (req, res) => {
  res.send('welcome to PetBuddy+ server')
})

app.use("/", authRoute);
app.use("/photos", photoRouter);
app.use("/users", userRouter);
app.use("/mail", MailRouter);

app.use("/admin", adminroute);
app.use("/doctor", doctorroute);

// const moment = require('moment');

// let timestamp = "2023-07-23T09:00:00.000Z"; // Note the leading zero in the hour
// let date = moment.parseZone(timestamp).format('MMMM Do YYYY, h:mm:ss a');

// console.log(date);



app.listen(3000, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
  console.log("Server is running on port http://localhost:3000");
  console.log("Server is running on https://petbuddy-main-server.onrender.com");
  
});

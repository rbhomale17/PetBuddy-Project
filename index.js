
const express = require("express");
const CORS = require("cors");
const { photoRouter } = require("./Backend/routes/photos.router");
const { connection } = require("./Backend/config/db");
const { userRouter } = require("./Backend/routes/users.route");
const { authRoute } = require("./Backend/routes/auth.routes");
const path = require("path");
const cookieParser = require("cookie-parser");

const { MailRouter } = require("./Backend/routes/mail.router");

let { adminroute } = require("./Backend/routes/admin");

let { doctorroute } = require("./Backend/routes/doctor.routes");
let {
  appointmentModel,
} = require("./Backend/models/appointmentModel");
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
const { UserModel } = require("./Backend/models/user.model");
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

// Convert the cron schedule from India time to Singapore time
const singaporeCronSchedule = "30 2 * * *"; // 2:30 AM in Singapore timezone


// Schedule the task to run at 2:30 AM daily in the India timezone (IST)
// cron.schedule(singaporeCronSchedule, () => {
//   deleteAppointments();
// });

// Schedule the task to run at 12 AM daily
cron.schedule("0 0 * * *", () => {
  deleteAppointments();
});

app.get('/', (req, res) => {
  // res.send('Appointments deletion triggered successfully.');
  res.send('welcome to PetBuddy+ server')
})

// const cron = require('node-cron');
const axios = require('axios'); // If you're using Axios for HTTP requests, otherwise use your preferred HTTP library

cron.schedule(singaporeCronSchedule, async () => {
  try {
    // Make a DELETE request to the /delete endpoint of your backend
    const response = await axios.get('https://petbuddy-main-server.onrender.com/delete');

    // Handle the response, if needed
    console.log('Delete request success:', response.data);
  } catch (error) {
    // Handle errors, if any
    console.error('Error invoking delete endpoint:', error.message);
  }
});
app.get('/delete', async(req, res) => {
  try {
    console.log('hii');
    await deleteAppointments();
    res.send('Appointments deletion triggered successfully.');
  } catch (err) {
    res.status(500).send('Error triggering appointments deletion.');
  }
});
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
});

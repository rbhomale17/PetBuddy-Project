// Import required modules
const express = require('express');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

// Create an instance of Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Set EJS as the template engine
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to render the initial door page
app.get('/', (req, res) => {
    res.render("door");
});

// Route to render the door page for view
app.get('/view', (req, res) => {
    console.log(__dirname);
    res.render('door'); // Replace 'your-ejs-file' with the actual filename (without the extension) of your EJS file
});

// Route to generate a unique room ID and redirect to the room
app.get('/room', (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

// Route to render the room page with the provided room ID as a parameter
app.get('/:room', (req, res) => {
    res.render("room", { roomId: req.params.room });
});

// Define the port on which the server will run
const PORT = process.env.PORT || 8081;

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Video Call Server is running at PORT ${PORT}`);
});

// Set up Socket.IO for real-time communication
const io = require('socket.io')(server);

// Peer Server setup using ExpressPeerServer
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
    debug: true,
});
app.use("/peerjs", peerServer);

// Socket.IO event handling
io.on('connection', (socket) => {
    console.log("New Connection at " + socket.id);

    // Event when a user joins a room
    socket.on("join-room", (roomId, userId) => {
        socket.join(roomId); // Join the specified room
        socket.to(roomId).emit("user-connected", userId); // Notify other users in the room about the new user

        // Event when a user disconnects from the room
        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', userId); // Notify other users in the room about the disconnection
        });

        // Event for sending and receiving messages in the room
        socket.on("message", (message) => {
            io.to(roomId).emit("createMessage", message); // Broadcast the message to all users in the room
        });
    });
});

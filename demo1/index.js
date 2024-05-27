const express = require("express")
const app = express();
const authRoute = require("./routes/authRoute");
const chatRoute = require("./routes/chatRoute");
const fileRoute = require("./routes/fileRoute");
const profileRoute = require("./routes/profileRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/chat', chatRoute);
app.use('/api/v1/file', fileRoute);
app.use('/api/v1/profile', profileRoute);
module.exports = app;


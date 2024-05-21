const express = require("express");
const firebaseAdmin = require("firebase-admin");
const credentials = require("./serviceKey.json");
const firebase = require("firebase/app");
const firebaseConfiguration = {
    apiKey: "AIzaSyCEtQXfqYufvbFVx2rF--9m3fRhdiIjNNo",
    authDomain: "bikerer-33382.firebaseapp.com",
    databaseURL: "https://bikerer-33382-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bikerer-33382",
    storageBucket: "bikerer-33382.appspot.com",
    messagingSenderId: "1096151599905",
    appId: "1:1096151599905:web:15e0131b50c45d09e10c60"
};

firebase.initializeApp(firebaseConfiguration);
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(credentials)
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use('/chat', chatRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`)
});

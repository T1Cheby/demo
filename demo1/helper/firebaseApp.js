const { initializeApp } = require("firebase/app");
// const { initializeApp } = require('firebase-admin/app');

const firebaseConfig = {
    apiKey: "AIzaSyCtt2IkYwNjEvNOdrhOuaDCWnsAPsinF28",
    authDomain: "demovital-90d7f.firebaseapp.com",
    databaseURL: "https://demovital-90d7f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "demovital-90d7f",
    storageBucket: "demovital-90d7f.appspot.com",
    messagingSenderId: "677154095160",
    appId: "1:677154095160:web:35a2a2f58cf615f13266cd",
    measurementId: "G-YPWZ472YG9"
};
const firebaseApp = initializeApp(firebaseConfig);


module.exports = firebaseApp;
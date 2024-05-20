const express = require("express")
const app = express();
const admin = require("firebase-admin");
const credentials = require("./serviceKey.json")
const firebase = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const firebaseConfig = {
    apiKey: "AIzaSyCEtQXfqYufvbFVx2rF--9m3fRhdiIjNNo",
    authDomain: "bikerer-33382.firebaseapp.com",
    databaseURL: "https://bikerer-33382-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bikerer-33382",
    storageBucket: "bikerer-33382.appspot.com",
    messagingSenderId: "1096151599905",
    appId: "1:1096151599905:web:15e0131b50c45d09e10c60"
};
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', async (req, res) => {
    const reqgisterInfo = await admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        disabled: false, // activate the account
        emailVerified: true
    });
    res.json(reqgisterInfo);
})

app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        // const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        // const userCredential = await auth.signInWithEmailAndPassword(email,password);
        // const user = userCredential.user;
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                res.json({ message: "Login successfully", user });
            })
            .catch((error) => {
                // res.status(400).json({ error: "Wrong password or username" });
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/invalid-credential') {
                    // Xử lý khi mật khẩu sai hoặc tên người dùng không tồn tại
                    res.status(400).json({ error: "Wrong password or username" });
                } else {
                    // Xử lý các trường hợp ngoại lệ khác
                    res.status(400).json({ error: errorMessage });
                }
            });

    } catch (error) {
        res.status(400).json({ error: error.message });

    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`)
});

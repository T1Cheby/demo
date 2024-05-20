const express = require("express")
const app = express();
const admin = require("firebase-admin");
const credentials = require("./serviceKey.json")
const firebase = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { getDatabase, ref, set, push, onValue } = require("firebase/database");
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

const db = getDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', async (req, res) => {
    const reqgisterInfo = await admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        disabled: false, // activate the account
        emailVerified: true //inactivate verigy email
    });
    res.json(reqgisterInfo);
})

app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                res.json({ message: "Login successfully", user });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/invalid-credential') {
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

app.post('/create-chat-room', (req, res) => {
    const { user1, user2 } = req.body;
    const chatRoomRef = push(ref(db, 'chatrooms'), {
        users: [user1, user2],
        messages: []
    });

    res.json({ message: "New chat room is created successfully", chatRoomId: chatRoomRef.key });
});

app.post('/send-message', (req, res) => {
    const { chatRoomId, sender, message } = req.body;
    const messagesRef = ref(db, `chatrooms/${chatRoomId}/messages`);
    const newMessageRef = push(messagesRef);
    
    set(newMessageRef, {
        sender,
        message,
        timestamp: Date.now()
    });

    res.json({ message: "Message sent successfully" });
});

app.get('/get-messages', (req, res) => {
    const chatRoomId = req.body.chatRoomId;
    const messagesRef = ref(db, `chatrooms/${chatRoomId}/messages`);
    
    onValue(messagesRef, (snapshot) => {
        const messages = snapshot.val();
        res.json({ messages });
    }, {
        onlyOnce: true
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`)
});



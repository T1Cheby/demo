const admin = require("firebase-admin");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

exports.register = async (req, res) => {
    try {
        // create new user in Firebase Authenication
        const registeredInfo = await admin.auth().createUser({
            email: req.body.email,
            password: req.body.password,
            emailVerified: true, //inactivate verify email
            disabled: false // activate the account
        });
        //send back userInfo
        res.json(registeredInfo);   
    } catch (e) {
        res.json({ error: e.message });
    }
};

exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const authentication = getAuth();

        signInWithEmailAndPassword(authentication, email, password)
            .then((authenticationResult) => {
                const userInfo = authenticationResult.user;
                res.json({ message: "Login successfully", userInfo: userInfo });
            })
            .catch((loginError) => {
                const code = loginError.code;
                const message = loginError.message; 
                if (code === "auth/invalid-credential") {
                    res.json({ error: "Wrong username or password" });
                } else {
                    res.json({ error: message });
                }
            });
    } catch (e) {
        res.json({ error: e.message });
    }
};

const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } = require("firebase/auth");
const firebaseApp = require("../helper/firebaseApp");
const { getFirestore } = require("firebase/firestore");
const { collection, doc, setDoc, getDoc, deleteDoc, updateDoc } = require("firebase/firestore");
const jwt = require("jsonwebtoken");
const authFApp = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const usersRef = collection(db, "users");
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const authMethod = require("../helper/authMethod");
const randToken = require("rand-token");

exports.login = async (userData) => {
    const { email, password } = userData;
    try {
        // const userCredential = await signInWithEmailAndPassword(authFApp, email, password);
        // const user = userCredential.user.providerData[0];
        // console.log("Login successful with this authentication account: " + user.email);


        // const { stsTokenManager } = userCredential.user;
        // const accessToken = stsTokenManager.accessToken;
        // const token = jwt.sign({ accessToken }, "secret", { expiresIn: '1h' });
        // user.token = token;

        // const docRef = doc(usersRef, email);
        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        //     console.log("Document data:", docSnap.data());
        // } else {
        //     console.log("No such document!");
        // }
        // return { message: "Login successful", user };

        const people = await Users.getUserByEmail(email);
        // console.log(people)
        if(!people){
            console.log(people)
            // return { message: "Account is already existed!" };
        }

        const isPasswordValid = bcrypt.compareSync(password, people.password);
        if(!isPasswordValid){
            console.log(isPasswordValid)
            // return { message: "Account is already existed!" };
        }
        const accessTokenLife = "2h";
        const accessTokenSecret = "vital_cap_24";
        const dataForToken = {
            email,
        }
        const accessToken = await authMethod.generateToken(
            dataForToken,
            accessTokenSecret,
            accessTokenLife
        );
        // console.log(accessToken)

        if(!accessToken){
            
            return { message: "Account is already existed!" };
        }

        let refeshToken = randToken.generate(50);
        if(people.refeshToken){
            console.log(people.refreshToken)
            await Users.updateRefreshToken(email, refeshToken);
        }else{
            refeshToken = people.refeshToken;
        }
        // console.log(people.refreshToken)

        return {
            message: "Login Successfully!",
            accessToken,
            refeshToken,
            user: people
        }



    } catch (error) {
        console.error("Error during login: ", error);
        return { message: "Login failed", error: error.message };
    }
}

exports.signup = async (userData) => {
    const { email, password } = userData;
    try {
        const userCredential = await createUserWithEmailAndPassword(authFApp, email, password);
        const user = userCredential.user.providerData[0];
        console.log("Created a new authentication account: " + user.email);

        // await setDoc(doc(usersRef, user.email), {
        //     email: user.email
        // });
        const people = await Users.getUserByEmail(email);
        // console.log(people)
        if(people){
            return { message: "Account is already existed!" };
        }else{
            const hashPassword = bcrypt.hashSync(password, 10);
            const newUser = {
                email,
                password: hashPassword
            }
            const createUser = await Users.createUser(newUser);
            if(!createUser){
                return { message: "Error while creating new account!" };
            }else{
                return { email: createUser.email};
            }
        }

        // return { message: "Signup successful", user };
    } catch (error) {
        console.error("Error during signup: ", error);
        return { message: "Signup failed", error: error.message };
    }
}

exports.deleteAuth = async (userData) => {
    const user = authFApp.currentUser;
    if (user) {
        try {
            await deleteUser(user);
            console.log("User deleted successfully");
            return { message: "User deleted successfully" };
        } catch (error) {
            console.error("Error deleting user: ", error);
            return { message: "Error deleting user", error: error.message };
        }
    } else {
        return { message: "No user is currently authenticated" };
    }
}


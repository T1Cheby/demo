const firebaseApp = require("../helper/firebaseApp");
const { collection, doc, getDoc, deleteDoc, updateDoc, getFirestore } = require("firebase/firestore");
const db = getFirestore(firebaseApp);
const usersRef = collection(db, "users");

exports.getProfile = async (userData) => {
    
    const docRef = doc(usersRef, userData.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return { message: "Profile found", data: docSnap.data() };
    } else {
        console.log("No such document!");
        return { message: "No such document!" };
    }
}

exports.updateProfile = async (userData) => {
    const docRef = doc(usersRef, userData.email);
    await updateDoc(docRef, {
        name: userData.name,
        age: userData.age,
        place: userData.place
    });
    return { message: "Profile updated!" };
}

exports.deleteProfile = async (userData) => {
    const docRef = doc(usersRef, userData.email);
    await deleteDoc(docRef);
    return { message: "Profile deleted!" };
}


const firebaseApp = require("../helper/firebaseApp");
const { collection, doc, getDocs, deleteDoc, updateDoc, getFirestore } = require("firebase/firestore");
const db = getFirestore(firebaseApp);
const usersRef = collection(db, "users");


exports.getUsers = async () => {
    // Check if the user has admin role
    // if (userData.role !== "admin") {
    //     throw new Error("Access denied. Only admins can access this resource.");
    // }
    const querySnapshot = await getDocs(usersRef);
    const userData = [];

    querySnapshot.forEach((doc) => {
        userData.push(doc.data());
    });

    return userData;
};


exports.modifyUser = async (userData) => {
    // // Check if the requesting user has admin role
    // if (requestingUserData.role !== "admin") {
    //     throw new Error("Access denied. Only admins can modify users.");
    // }

    const docRef = doc(usersRef, userData.email);
    await updateDoc(docRef, userData);
    return { message: "User updated!" };
};


exports.deleteUser = async (userData) => {
    // // Check if the requesting user has admin role
    // if (requestingUserData.role !== "admin") {
    //     throw new Error("Access denied. Only admins can delete users.");
    // }

    const docRef = doc(usersRef, userData.email);
    await deleteDoc(docRef);
    return { message: "User deleted!" };
};

// // Function to lock access to a user
// exports.lockUserAccess = async (userData, requestingUserData) => {
//     // Check if the requesting user has admin role
//     if (requestingUserData.role !== "admin") {
//         throw new Error("Access denied. Only admins can lock user access.");
//     }

//     // Implement locking access logic here
// };

// // Function to manage the number of users
// exports.manageUserCount = async (userData, requestingUserData) => {
//     // Check if the requesting user has admin role
//     if (requestingUserData.role !== "admin") {
//         throw new Error("Access denied. Only admins can manage user count.");
//     }

//     // Implement user count management logic here
// };

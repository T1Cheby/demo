const firebaseApp = require("../helper/firebaseApp");
const { getDatabase, ref, set, push, onValue, get} = require("firebase/database");
const db = getDatabase(firebaseApp);

exports.generateChat = async (user1, user2) => {
    const customKey = [user1, user2].sort().join("_"); // Ensure consistent key ordering
    const chatRoomsRef = ref(db, `chatRooms/${customKey}`);
    const snapshot = await get(chatRoomsRef);

    if (snapshot.exists()) {
        const chatRoomData = snapshot.val();
        if (chatRoomData.users.includes(user1) && chatRoomData.users.includes(user2)) {
            console.log("Chat room already exists:", customKey);
            return { message: "Chat room already exists" };
        }
    }

    await set(chatRoomsRef, {
        users: [user1, user2].sort(),
        messages: []
    });
    console.log("New chat room created:", customKey);
    return { message: "New chat room created", chatRoomID: customKey };
};

exports.postMessage = async (chatRoomID, sender, message) => {
    const messagesReference = ref(db, `chatRooms/${chatRoomID}/messages`);
    const newMessageRef = push(messagesReference);
    const currentTime = new Date().toISOString(); // Use ISO string for time

    await set(newMessageRef, {
        sender,
        message,
        time: currentTime
    });

    console.log({ message: "Send message successfully" });
    return { message: "Message sent successfully" };
};

exports.fetchMessages = async (chatRoomID) => {
    const chatRoomsRef = ref(db, `chatRooms/${chatRoomID}/messages`);
    const snapshot = await get(chatRoomsRef);

    if (snapshot.exists()) {
        const messagesObj = snapshot.val();
        // Extract messages into an array
        const messages = Object.keys(messagesObj).map(key => messagesObj[key]);
        console.log(messages);
        return { message: "Messages fetched successfully", messages };
    } else {
        console.log("No messages found");
        return { message: "No messages found" };
    }
};

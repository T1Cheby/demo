const { getDatabase, ref, set, push, get, onValue } = require("firebase/database");
const db = getDatabase();

exports.generateChat = async (req, res) => {
    const user2 = req.body.user2;
    const user1 = req.body.user1;

    const chatRoomsReference = ref(db, 'chat');
    //get data from chat collection
    const chatSnapshot = await get(chatRoomsReference);

    let roomExists = false;

    chatSnapshot.forEach((child) => {
        //get data from child component
        const roomData = child.val();
        const users = roomData.users;

        if (users.includes(user2) && users.includes(user1)) {
            roomExists = true;
            return;
        }
    });

    if (!roomExists) {
        //create reference for new child node and its unique ID
        const newRoomReference = push(chatRoomsReference);
        //set values for new node
        await set(newRoomReference, {
            users: [user1, user2],
            messages: []
        });
        res.json({ message: "Create chat room successfully", chatRoomId: newRoomReference.key });
    } else {
        res.json({ message: "Chat room between these users already exists" });
    }
};

exports.postMessage = async (req, res) => {
    const chatRoomID = req.body.chatRoomID;
    const sender = req.body.sender;
    const message = req.body.message;
    const messagesReference = ref(db, `chat/${chatRoomID}/messages`);
    const newMessageRef = push(messagesReference);
    const currentTime = new Date();
    await set(newMessageRef, {
        sender,
        message,
        time: currentTime.toString()
    });

    res.json({ message: "Send message successfully" });
};

exports.fetchMessages = (req, res) => {
    const chatRoomID = req.body.chatRoomID;
    const messagesReference = ref(db, `chat/${chatRoomID}/messages`);
    //onvalue listen to listens for data changes at messages and return the updated info
    onValue(messagesReference, (messageInfo) => {
        const messagesData = messageInfo.val();
        res.json({ messages: messagesData });
    }, {
        onlyOnce: true
    });
};

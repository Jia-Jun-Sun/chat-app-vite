import mongoose from 'mongoose'; // allows us to interact with MongoDB


// Define a message schema
const messageSchema = new mongoose.Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true }, // References the chat this message belongs to
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // References the user who sent the message
    text: { type: String, required: true }, // The message content
    timestamp: { type: Date, default: Date.now } // Auto-sets the time of the message
});


const Message = mongoose.model("Message", messageSchema);


export default Message;
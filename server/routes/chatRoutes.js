import express from 'express';
import Chat from "../models/message.model.js";

const router = express.Router();


// Get all chats
router.get("/" , async (req, res) => {
    try {
        const chats = await Chat.find();
        res.json(chats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Route to create new chat
router.post('/', async (res, req) => {
    try {
        const newChat = new Chat({ name: req.body.name }); // creates a new chat document (mongoDB equvalent of table). this creates the new chat object but doesn't save it to the database yet
        await newChat.save(); // saves the new chat into our MongoDB database. If successful, the chat is stored in the chats collection.
        res.status(200).json(newChat); // returns the newly created Chat room back to the client as JSON format
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
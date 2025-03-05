import express, { Router } from 'express';
const router = Router();
import Message from "../models/message.model.js";


// Get messages for a specific chat
router.get("/:chatId/messages", async (req, res) => {
    try {
        const messages = await Message.find({ chatId: req.params.chatId }); // Queries the database to find all messages where the chatId matches the one provided in the request URL
        res.json(messages); // Sends the retrieved messages as a JSON response to the client
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch messsages" });
    }
});


// Send a new message in a specific chat
router.post("/:chatId/messages", async (req, res) => {
   try {
       const { sender, text } = req.body; // extracts the sender and the text content from the request's body when it's sent from the client to the server
       const newMessage = new Message ({
           chatId: req.params.chatId,
           sender, // this comes from the req.body
           text, // this comes from req.body
           timestamp: new Date()
       });

       const savedMessage = newMessage.save(); // Saves the new message to the database
       res.json(savedMessage); // returns the saved message as a JSON response to the client
   } catch (error) {
       res.status(500).json({ error: "Failed to send message" })
   }
});



export default router;
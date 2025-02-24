import express, { Router } from 'express';
const router = Router();


import chatRoutes from "./chatRoutes.js"; // I'm import this because I need to have the id of a specific chat


// here i created some mock data of their messages
const messagesRoute = [
    { sessionId: chatRoutes.chat.id, // how do I extract a specific chat from all the chats from chatRoutes?
      messages: [ // how would I also get my messages in here?
            { id: 1, senderId: 1, message: "hey I missed you", timeStamp: "10:00pm" }, // the id is the message id, senderId is the other party's id
            { id: 2, senderId: 1, message: "Heyo", timeStamp: "2 hours ago" },
            { id: 3, senderId: 1, message: "I hope we're still going", timeStamp: "yesterday" },
            { id: 4, senderId: 1, message: "You're so funny", timeStamp: "January 18, 2025" },
      ] },
    { sessionId: 2,
        messages: [
            { id: 1, senderId: 2, message: "where you at", timeStamp: "10:00pm" },
            { id: 2, senderId: 2, message: "I'm online", timeStamp: "2 hours ago" },
            { id: 3, senderId: 2, message: "Where's the mouse", timeStamp: "yesterday" },
            { id: 4, senderId: 2, message: "Today is the day", timeStamp: "January 18, 2025" },
        ] },
];

// here I want to make a socket connection open to whatever text we send back and fourth, but I don't know how to implement it
io.on('/', (socket) => {

})

export default router;
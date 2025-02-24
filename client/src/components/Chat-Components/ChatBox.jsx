import react, { useState, useEffect } from "react";
import axios from 'axios';
import './ChatBox.css';
import io from 'socket.io-client'


const socket= io("http://localhost:5001"); // Creates a connection to the Socket.io server running on localhost:5001. Creating a real-time messaging functionality


// defines a React functional component called ChatBox
const ChatBox = ({ chatId, otherUser }) => { // it takes in two props. chatId: id of the chat session | otherUser: name of person you're chatting with (displayed in the header)
    // the state variables
    const [messages, setMessages] = useState([]); // Messages: stores the chat history. Initialy it will be an empty array, because there's no messages in it yet | setMessages: function to update 'messages' states, or add new messages to the array "messages"
    const [newMessage, setNewMessage] = useState(""); // newMessage: stores the new message typed by the user in the input box | setNewMessage: function to update newMessage


    // RECEIVING
    // fetching messages from the Server
    useEffect(() => {
        axios.get(`http://localhost:5001/api/chats/${chatId}/messages`)
            .then(response => setMessages(response.data))
            .catch(error => console.error(error))
    }, [chatId]); // we're monitoring the chatId, if it changes we run the useEffect again, getting a different chat because the chatId changed


    // Listening for incoming messages via Socket.io
    useEffect(() => {
        socket.on("receiveMessage", () => { // listens for an event omitted from the server called "receiveMessage"
            setMessages(prevMessages => [...prevMessages, message]); // uses setMessages to update the messages array. when setMessages is called, messages transforms in to prevMessages, then the new "message" from the backend is added to prevMessages, then prevMessages transforms back into messages
        });

        // clean up function that removes the event listener
        return () => { // socket.off is wrapped inside a return function, because in useEffect, returning a function is a cleanup mechanism that runs when the component unmounts.
            socket.off("receiveMessage"); // stops listening to the event "receiveMessage" omitted from the backend
        };
    }, []);


    // SENDING
    // Handle SENDING messages, it's responsible for sending a message from the user to the chat and updating the UI in real-time.
    const sendMessage = () => {
        if (newMessage.trim() === "") return; // Checks if the message is empty. If the message is empty (e.g., just spaces), the function exits early using return (does nothing).

        // creates a message object to structure and organize the message before sending it to the server. Ensuring that every message has chat ID, sender, the text message, and time stamp of that text
        const messageData = {
            chatId, // identifies which chat the message belongs to
            sender: "me", // ho is sending the message (in this case, 'me'), we can also replace "me" with the user ID from authentication later
            text: newMessage, // actual text user typed
            timestamp: new Date().toISOString() // the time the message was sent
        };

        // Emit message to server using Socket.io emit()
        socket.emit("sendMessages", messageData) // "sendMessages" is the event we are emiting to the server, the messageData is the message object


        // update ui immediately
        setMessages(prevMessages => [...prevMessages, messageData]);
        setNewMessage(""); // Clear input field
    };


    // displaying the UI
    return (
        <div>
            {/* Header */}
            <header>
                {otherUser}
            </header>


            {/* Messages */}
            <div>
                {/* how do I display the contents of the sent and received messages, with our messages on the right, and their messages on the left? */}
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`max-w-xs p-2 rounded-lg shadow ${
                            msg.sender === currentUser ? "bg-blue-500 text-white self-end ml-auto" : "bg-green-300 text-black self-start"
                        }`}
                    >
                        <p>{msg.text}</p>
                        <small className="text-xs block mt-1 text-grey-700">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                        </small>
                    </div>
                ))}
            </div>


            {/* Input Box */}
            <div className="flex item-center border-t bg-white p-2">
                <input
                    type="text"
                    className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    send
                </button>
            </div>
        </div>
    )
};

export default ChatBox;
import { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeScreen.css';


const HomeScreen = () => {
    const [chats, setChats] = useState([]); // current chat list
    const [showInput, setShowInput] = useState(false); // controls the input box visibility when creating a new chat
    const [newChatName, setNewChatName] = useState(""); // stores the input for the new chat


    // Fetches chats
    useEffect(() => {
        // fetch chats from the backend URL
        axios.get("http://localhost:5001/api/chats")
            .then(response => setChats(response.data)) // makes a request to your backend using Axios to get the list of chats. Once the data is fetched, setChats(response.data) stores that data in the chats state variable.
            .catch(error => console.error("Error fetching chats", error))
    }, [])

    // function to handle when adding a new chat
    const handleAddChat = async (event) => { // function that gets called when the enter key is pressed inside the input box after pressing the + button
        if (event.key === "Enter" && newChatName.trim()) { // checks if the enter key is press and that the user didn't just leave an empty space for the person they want to talk to
            try {
                const response = await axios.post("http://lcoalhost:5001/api/chats/", { name: newChatName });
                setChats(prevChats => [...prevChats, response.data]); // Update chat list
                setNewChatName(""); // Clears the input box
                setShowInput(false); // Hides the floating input box
            } catch (err) {
                console.error("Error creating chat", err)
            }
        }
    }


    return (
        <div className="flex flex-col h-screen bg-red-100">
            <header className="p-4 text-lg text-purple-400 font-semibold bg-yellow-300 shadow-md">
                Chats
            </header>

            {/* Chat List. the function inside is to check if there are any active chats */}
            <div>
                {chats.length > 0 ? (
                    chats.map((chat) => (
                        <div key={chat._id} className="p-4 bg-green-100 mb-2 rounded-lg shadow">
                            {chat.name}
                        </div>
                    ))
                ) : (
                    <p className="text-grey-500 text-center">No Active Chats </p>
                )}
            </div>

            {/* Floating input box for creating new chats */}
            {showInput && ( // this is a conditional rendering check. if showInput is true, render the box, else render nothing
                <div
                    className="fixed inset-0 flex items-center justify-center"
                    onClick={() => setShowInput(false)} // clicking outside the input box closes it
                >
                    <div
                        className="p-4 w-80 bg-white border rounded-md shadow-lg"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the input box
                    >
                        <input
                            type="input"
                            className="w-full p-4 text-lg border rounded-lg"
                            placeholder="Enter username or Id of person"
                            value={newChatName}
                            onChange={(e) => setNewChatName(e.target.value)}
                            onKeyDown={handleAddChat}
                            autoFocus
                        />
                    </div>
                </div>
            )}

            <button
                className="fixed bottom-6 right-6 bg-green-100 text-blue-500 p-4 rounded-full shadow-lg text-2xl"
                onClick={() => setShowInput(true)}
            >
                +
            </button>
        </div>
    );
};


export default HomeScreen;
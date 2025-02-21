import react, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeScreen.css';


const HomeScreen = () => {
    // mock data for active chats, later we'll replace this will the data from our backend server
    const [chats, setChats] = useState([]);


    useEffect(() => {
        // fetch chats from the backend (replace the URL when backend is ready)
        axios.get("https://localhost:5001/api/chats")
            .then(response => setChats(response.data)) // makes a request to your backend using Axios to get the list of chats. Once the data is fetched, setChats(response.data) stores that data in the chats state variable.
            .catch(error => console.error("Error fetching chats", error))
    }, [])


    return (
        <div className="flex flex-col h-screen bg-red-100">
            <header className="p-4 text-lg text-purple-400 font-semibold bg-yellow-300 shadow-md">
                Chats
            </header>

            {/* Chat List, here we check is there are any active chats available */}
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


            <button className="fixed bottom-6 right-6 bg-green-100 text-blue-500 p-4 rounded-full shadow-lg text-2xl">
                +
            </button>
        </div>
    );
};


export default HomeScreen;
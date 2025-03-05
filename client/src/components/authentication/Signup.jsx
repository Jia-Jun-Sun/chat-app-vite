import { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";


// creates the component Sign up form

const Signup = () => {
    const [username, setUsername] = useState(""); // client's username when they sign up
    const [email, setEmail] = useState(""); //
    const [password, setPassword] = useState(""); // client's password when they sing up
    const [error, setError] = useState("")

    const navigate = useNavigate();

    // handles the logic of signing up
    const handleSignup = async (e) => { // handleSignup is an async function that will trigger when the form is submitted
        e.preventDefault(); // prevents the form from reloading when submitted

        try {
            const response = await axios.post('http://localhost:5001/api/users/signup', { username, email, password });

            localStorage.setItem("userId", response.data.user._id); // stores the user's unique id in the localStorage
            localStorage.setItem("token", response.data.token); // stores the user's token in the localStorage

            alert("Signup successful"); // shows a pop-up form confirming the signup was successful

            navigate("Signup successful"); // Redirect to login page after successful signup
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed..."); // err.response?.data?.error is undefined (e.g., server didn't send an error message), we provide a fallback message
        }
    }


    // rendering the UI of the sign up page
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
                {error && <p className="text-red-500 text-small mb-2">{error}</p>}
                <form onSubmit={handleSignup} className="space-y-3">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full p-2 border rounded-xl focus:outline-none focus:right-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border rounded-xl focus:outline-none focus:right-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border rounded-xl focus:outline-none focus:right-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
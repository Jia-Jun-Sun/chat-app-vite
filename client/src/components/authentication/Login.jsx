import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Component for logging in


const Login = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // for showing errors

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // prevents the page from reloading

        try {
            const response = await axios.post('http://localhost:5001/api/users/login', { username, email, password });

            // Extract the token after the login request has been sent to the backend from axios
            const { token } = response.data;

            // Save token to localStorage
            localStorage.setItem("token", token);
            console.log("Login successful, token stored!");

            // Redirect to HomeScreen
        } catch (err) {
            setError(err.response?.data?.error || "Login failed.");
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-grey-100">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500">{error}</p>}

            <form>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 w-full mb-3"
                    required
                />
                <input
                    type="text"
                    placeholder="Email {optional}"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full mb-3"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full mb-3"
                    required
                />

                <p>
                    Don't have an account?
                    <a className="">Sign up for an account</a>
                </p>

                <button type="submit" className="bg-blue-500 text-white p-2 w-full">
                    Login
                </button>


            </form>
        </div>
    );
};


export default Login;
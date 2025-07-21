import "../SignUp/style.css";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../axiosConfig.js";
import { WEBPAGE_URL } from "../axiosConfig.js";

export default function Login() {

    const navigate = useNavigate();

    // Navigate back to the main website or landing page
    const handleclick = () => {
        window.location.href = `${WEBPAGE_URL}`;
    };

    // Navigate to the signup page
    const handleAction = () => {
        navigate("/signup");
    };

    // State variables for user inputs and UI feedback
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Function to handle login process
    const handleLogin = async () => {
        // Simple validation
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        try {
            // Set loading and clear previous messages
            setLoading(true);
            setSuccess("");
            setError("");

            // Send POST request to backend for login
            const response = await axios.post(`${BASE_URL}/login`, {
                email: email.trim(),
                password: password.trim(),
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 5000, // Optional timeout for request
            });

            // If login is successful and token received
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token); // Store token
                setSuccess("SuccessFully Signed Up");
                navigate(`/dashboard`); // Redirect to dashboard
            } else {
                // Invalid credentials case
                setError("Invalid credentials. Please try again.");
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message); // API-provided error
            } else {
                setError("An error occurred while trying to log in. Please try again later."); // General fallback error
            }

        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <>
            {/* Page overlay background */}
            <div className="page" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", height: "100vh" }}>

                {/* Back button to return to main page */}
                <button className="text-center m-4  px-5 py-2 mb-17 font-bold font-sm text-white rounded-md hover:scale-105 cursor-pointer"
                    style={{ backgroundColor: "#023e8a" }} onClick={handleclick}>
                    <i className="fa-solid fa-arrow-left" style={{ color: "#fff" }}></i> &nbsp;
                    Back
                </button>

                {/* Login box container */}
                <div className="box">
                    {/* Static login heading/button */}
                    <button className="text-center m-4 w-30 p-3 px-0 font-bold font-sm rounded-md" style={{ border: "2px solid #023e8a" }}> Login</button>

                    {/* Display error message if login fails */}
                    {error && <div className="text-red-600 font-mediud">{error}</div>}

                    {/* Display success message if login succeeds */}
                    {success && <div style={{
                        backgroundColor: "#d4edda",
                        border: "1px solid #c3e6cb",
                        color: "#155724",
                        padding: "10px",
                        borderRadius: "5px",
                        marginTop: "10px"
                    }}>
                        ✅ Login successful!
                    </div>}

                    {/* Form fields */}
                    <div className="w-[90%]">

                        {/* Email input */}
                        <div className="email flex pt-5 pb-1" style={{ borderBottom: "2px solid rgba(0, 0, 0, 0.2" }}>
                            <img src="/image/signUp-email.png" alt="signUp-email Image" className='w-9 h-9 p-2' />
                            <input type="email" id="email" placeholder='Enter your email' className='p-6 ml-1'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password input */}
                        <div className="password flex pt-5 pb-1" style={{ borderBottom: "2px solid rgba(0, 0, 0, 0.2" }}>
                            <img src="/image/signUp-password.png" alt="signUp-password Image" className='w-10 h-10 p-2' />
                            <input type="password" id="password" placeholder='Enter your password' className='p-6 ml-1'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Login button and navigation to sign up */}
                    <div className="button w-full text-center items-center h-[30%] flex flex-col justify-between">
                        {/* Login button triggers handleLogin */}
                        <button className="text-center m-4 w-[70%] px-5 py-2 font-bold font-sm text-white hover:scale-105 cursor-pointer"
                            style={{ backgroundColor: "#023e8a", borderRadius: "45px" }}
                            onClick={handleLogin} disabled={loading}
                        >
                            Login
                        </button>

                        {/* Link to signup page */}
                        <div className="p-4 w-full text-center pb-0" style={{ borderTop: "2px solid rgba(0, 0, 0, 0.1" }}>
                            <p>Don't have an account?
                                &nbsp;
                                <a href="" className='text-blue-900 font-bold' onClick={handleAction}>Sign up</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
